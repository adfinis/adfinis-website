import { execFileSync } from 'node:child_process'
import { appendFileSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { bumpFor, checkMessage } from './commit-convention.mjs'

const BUMPS = ['patch', 'minor', 'major']
const APPS = ['nextjs', 'strapi']

export function higherBump(a, b) {
  return BUMPS.indexOf(a) >= BUMPS.indexOf(b) ? a : b
}

export function nextVersion(version, bump) {
  const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(version)
  if (!match) throw new Error(`"${version}" is not a plain x.y.z version`)
  const [major, minor, patch] = match.slice(1).map(Number)
  if (bump === 'major') return `${major + 1}.0.0`
  if (bump === 'minor') return `${major}.${minor + 1}.0`
  return `${major}.${minor}.${patch + 1}`
}

export function releaseDate(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en', {
    timeZone: 'Europe/Amsterdam',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now)
  const part = (type) => parts.find((p) => p.type === type).value
  return `${part('year')}-${part('month')}-${part('day')}`
}

export function planRelease(commits, requested = 'auto') {
  let required = 'patch'
  const reasons = []
  const warnings = []

  for (const commit of commits) {
    const result = checkMessage(commit.message)
    const bump = bumpFor(result)
    if (bump !== 'patch') reasons.push(`${bump}: ${commit.sha} ${commit.subject}`)
    required = higherBump(required, bump)
    if (result.errors.length) warnings.push(`${commit.sha} ${commit.subject} (${result.errors.join('; ')})`)
  }

  const bump = requested === 'auto' ? required : higherBump(required, requested)
  return { bump, required, reasons, warnings }
}

export function changelogSection(version, date, commits) {
  return [`## [${version}] - ${date}`, '', ...commits.map((c) => `- ${c.subject}`), ''].join('\n')
}

export function insertSection(changelog, section) {
  const lines = changelog.split('\n')
  const index = lines.findIndex((line) => /^## \[\d/.test(line))
  if (index === -1) throw new Error('CHANGELOG.md has no "## [x.y.z]" heading to put the new section above')
  return [...lines.slice(0, index), section, ...lines.slice(index)].join('\n')
}

export function isReleaseCommit(subject) {
  return /^chore\(release\): \S+$/.test(subject) || subject === 'chore: changelog'
}

export function compareVersions(a, b) {
  const [pa, pb] = [a, b].map((v) => v.split('.').map(Number))
  for (let i = 0; i < 3; i++) if (pa[i] !== pb[i]) return pa[i] - pb[i]
  return 0
}

function git(...args) {
  return execFileSync('git', args, { encoding: 'utf8' })
}

function lastReleaseCommit() {
  const log = git('log', '--no-merges', '--format=%h%x1f%s', '-E', '--grep=^chore(\\(release\\))?: ', 'HEAD')
  for (const line of log.split('\n')) {
    const [sha, subject] = line.split('\x1f')
    if (sha && isReleaseCommit(subject)) return { sha, subject }
  }
  return null
}

function versionAt(ref) {
  return JSON.parse(git('show', `${ref}:nextjs/package.json`)).version
}

function findBase(main) {
  const release = lastReleaseCommit()
  if (!release) return { base: main }
  const released = versionAt(release.sha)
  const onMain = versionAt(main)
  if (compareVersions(released, onMain) > 0) {
    return {
      error: [
        `develop already has release commit ${release.sha} "${release.subject}" for ${released}, but ${main} is still at ${onMain}.`,
        `If no release PR is open, open it by hand: gh pr create --base main --head develop --title "Release ${released}"`,
      ].join('\n'),
    }
  }
  return { base: release.sha }
}

function readCommits(base) {
  return git('log', '--no-merges', '--format=%h%x1f%s%x1f%B%x1e', `${base}..HEAD`)
    .split('\x1e')
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const [sha, subject, message] = entry.split('\x1f')
      return { sha, subject, message }
    })
}

function readVersions(root) {
  return Object.fromEntries(
    APPS.map((app) => [app, JSON.parse(readFileSync(join(root, app, 'package.json'), 'utf8')).version]),
  )
}

function parseArgs(args) {
  const options = { bump: 'auto', main: 'origin/main', notesFile: null, dryRun: false }
  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (arg === '--bump') options.bump = args[++i]
    else if (arg === '--main') options.main = args[++i]
    else if (arg === '--notes-file') options.notesFile = args[++i]
    else if (arg === '--dry-run') options.dryRun = true
    else throw new Error(`unknown option "${arg}"`)
  }
  if (!['auto', ...BUMPS].includes(options.bump)) {
    throw new Error(`--bump must be auto, patch, minor or major, not "${options.bump}"`)
  }
  return options
}

function output(name, value) {
  if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `${name}=${value}\n`)
}

function summary(text) {
  if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${text}\n`)
}

function main(args) {
  const options = parseArgs(args)
  const root = git('rev-parse', '--show-toplevel').trim()

  const versions = readVersions(root)
  if (versions.nextjs !== versions.strapi) {
    console.error(`nextjs is at ${versions.nextjs} but strapi is at ${versions.strapi}; make them match first.`)
    return 1
  }

  const { base, error } = findBase(options.main)
  if (error) {
    console.error(error)
    return 1
  }

  const commits = readCommits(base)
  if (!commits.length) {
    console.error(`Nothing to release: no commits since ${base}.`)
    return 1
  }
  console.log(`Commits since ${base}: ${commits.length}`)

  const plan = planRelease(commits, options.bump)
  const version = nextVersion(versions.nextjs, plan.bump)
  const section = changelogSection(version, releaseDate(), commits)

  console.log(`${versions.nextjs} -> ${version} (${plan.bump}; the commits need at least ${plan.required})`)
  for (const reason of plan.reasons) console.log(`  ${reason}`)
  for (const warning of plan.warnings) console.log(`::warning::Wrong commit format, counted as patch: ${warning}`)
  console.log(`\n${section}`)

  summary(`${section}\nBump: ${plan.bump} (${versions.nextjs} -> ${version})\n`)
  if (plan.warnings.length) {
    summary(`Wrong commit format, counted as patch:\n\n${plan.warnings.map((w) => `- ${w}`).join('\n')}\n`)
  }
  output('version', version)

  if (options.dryRun) {
    console.log('Dry run: nothing written.')
    return 0
  }

  for (const app of APPS) {
    execFileSync('npm', ['version', version, '--no-git-tag-version'], { cwd: join(root, app), stdio: 'ignore' })
  }
  const changelogPath = join(root, 'CHANGELOG.md')
  writeFileSync(changelogPath, insertSection(readFileSync(changelogPath, 'utf8'), section))
  if (options.notesFile) writeFileSync(options.notesFile, section)
  return 0
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    process.exitCode = main(process.argv.slice(2))
  } catch (error) {
    console.error(error.message)
    process.exitCode = 1
  }
}
