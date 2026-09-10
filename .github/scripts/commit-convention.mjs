import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'

export const TYPES = [
  'feat',
  'fix',
  'perf',
  'refactor',
  'style',
  'test',
  'docs',
  'build',
  'ci',
  'chore',
  'revert',
]

const TICKET_TYPES = ['feat', 'fix', 'perf', 'refactor']
const TICKET = /^AW-\d+$/
const WORD = /^[a-z][a-z0-9-]*$/
const SKIPPED = /^(Merge |Revert "|fixup! |squash! |amend! )/
const HEADER =
  /^(?<type>[A-Za-z]+)(?<gap>\s*)(?:\((?<scope>[^)]*)\))?(?<bang>!)?(?<colon>:?)(?<space>\s*)(?<description>.*)$/
const BREAKING_FOOTER = /^BREAKING[ -]CHANGE: /m
const MAX_HEADER = 100
const PR_NUMBER = / \(#\d+\)$/

export const FORMAT_HELP = [
  'Format: type(scope)!: description',
  '  e.g. feat(AW-123): add event filter',
  `  types: ${TYPES.join(', ')}`,
  'See "Commit messages" in README.md.',
].join('\n')

function messageLines(message) {
  const lines = []
  for (const line of message.split('\n')) {
    if (line.startsWith('# ------------------------ >8 ------------------------')) break
    if (!line.startsWith('#')) lines.push(line)
  }
  while (lines.length && lines[0].trim() === '') lines.shift()
  return lines
}

export function checkMessage(message) {
  const lines = messageLines(message)
  const header = (lines[0] ?? '').trimEnd()
  const body = lines.slice(1).join('\n')
  const result = { header, type: null, scope: null, breaking: false, skipped: false, errors: [] }

  if (SKIPPED.test(header)) {
    result.skipped = true
    return result
  }

  const match = HEADER.exec(header)
  if (!match) {
    result.errors.push('the header must start with a type, e.g. "feat(AW-123): add event filter"')
    return result
  }

  const { type, gap, scope, bang, colon, space, description } = match.groups
  const errors = result.errors

  if (TYPES.includes(type)) {
    result.type = type
  } else if (TYPES.includes(type.toLowerCase())) {
    errors.push(`the type must be lowercase: "${type.toLowerCase()}"`)
    result.type = type.toLowerCase()
  } else {
    errors.push(`"${type}" is not a type; use one of: ${TYPES.join(', ')}`)
  }

  if (gap && scope !== undefined) errors.push('no space between the type and "("')
  else if (gap && (bang || colon)) errors.push('no space between the type and the colon')

  const lowercaseTicket = scope !== undefined && !TICKET.test(scope) && TICKET.test(scope.toUpperCase())
  if (scope !== undefined) {
    if (lowercaseTicket) {
      errors.push(`the Jira key must be in capitals: "${scope.toUpperCase()}"`)
    } else if (TICKET.test(scope) || WORD.test(scope)) {
      result.scope = scope
    } else {
      errors.push(`the scope must be one Jira key like "AW-123" or one lowercase word, not "${scope}"`)
    }
  }

  if (TICKET_TYPES.includes(result.type) && !TICKET.test(scope ?? '') && !lowercaseTicket) {
    errors.push(`"${result.type}" needs a Jira key as scope, e.g. "${result.type}(AW-123): ..."`)
  }

  if (!colon) {
    errors.push('a colon must follow the type or scope, e.g. "feat(AW-123): ..."')
  } else if (space !== ' ') {
    errors.push('put exactly one space after the colon')
  }

  if (!description) {
    errors.push('the description is missing')
  } else {
    if (!/^[a-z0-9]/.test(description)) {
      errors.push('the description must start with a lowercase letter or a digit')
    }
    if (description.endsWith('.')) errors.push('the description must not end with a full stop')
  }

  const length = header.replace(PR_NUMBER, '').length
  if (length > MAX_HEADER) {
    errors.push(`the header is ${length} characters; the most is ${MAX_HEADER}`)
  }

  result.breaking = Boolean(bang) || BREAKING_FOOTER.test(body)
  return result
}

export function bumpFor(result) {
  if (result.breaking) return 'major'
  if (result.type === 'feat' && result.errors.length === 0) return 'minor'
  return 'patch'
}

function report(label, result) {
  console.error(`${label} does not follow the commit convention:`)
  console.error(`  ${result.header || '(empty)'}`)
  for (const error of result.errors) console.error(`  - ${error}`)
  console.error('')
}

function commitsInRange(range) {
  const log = execFileSync('git', ['log', '--no-merges', '--format=%h%x1f%B%x1e', range], {
    encoding: 'utf8',
  })
  return log
    .split('\x1e')
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const [sha, message] = entry.split('\x1f')
      return { sha, message }
    })
}

function main(args) {
  const [flag, value] = args
  let checks

  if (flag === '--file' && value) {
    checks = [{ label: 'The commit message', message: readFileSync(value, 'utf8') }]
  } else if (flag === '--message' && value !== undefined) {
    checks = [{ label: 'The PR title', message: value }]
  } else if (flag === '--range' && value) {
    checks = commitsInRange(value).map(({ sha, message }) => ({ label: `Commit ${sha}`, message }))
  } else {
    console.error('Usage: commit-convention.mjs --file <path> | --message <text> | --range <base>..<head>')
    return 2
  }

  let failed = false
  for (const { label, message } of checks) {
    const result = checkMessage(message)
    if (result.errors.length) {
      failed = true
      report(label, result)
    }
  }

  if (failed) console.error(FORMAT_HELP)
  return failed ? 1 : 0
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  process.exitCode = main(process.argv.slice(2))
}
