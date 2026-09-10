import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, it } from 'node:test'
import { fileURLToPath } from 'node:url'
import {
  changelogSection,
  compareVersions,
  higherBump,
  isReleaseCommit,
  insertSection,
  nextVersion,
  planRelease,
  releaseDate,
} from './release-notes.mjs'

const commit = (subject, body = '') => ({
  sha: 'abc1234',
  subject,
  message: body ? `${subject}\n\n${body}` : subject,
})

describe('nextVersion', () => {
  it('raises the right part and resets the ones after it', () => {
    assert.equal(nextVersion('1.35.2', 'patch'), '1.35.3')
    assert.equal(nextVersion('1.35.2', 'minor'), '1.36.0')
    assert.equal(nextVersion('1.35.2', 'major'), '2.0.0')
  })

  it('refuses anything that is not x.y.z', () => {
    assert.throws(() => nextVersion('1.35.0-beta.1', 'patch'))
  })
})

describe('higherBump', () => {
  it('keeps the larger of two bumps', () => {
    assert.equal(higherBump('patch', 'minor'), 'minor')
    assert.equal(higherBump('major', 'minor'), 'major')
    assert.equal(higherBump('patch', 'patch'), 'patch')
  })
})

describe('planRelease', () => {
  it('gives patch when there are only fixes', () => {
    const plan = planRelease([commit('fix(AW-1): a'), commit('chore(deps): bump x')])
    assert.equal(plan.bump, 'patch')
  })

  it('gives minor when one commit is a feat', () => {
    const plan = planRelease([commit('fix(AW-1): a'), commit('feat(AW-2): b')])
    assert.equal(plan.bump, 'minor')
    assert.deepEqual(plan.reasons, ['minor: abc1234 feat(AW-2): b'])
  })

  it('gives major for a bang or a BREAKING CHANGE line', () => {
    assert.equal(planRelease([commit('feat(AW-1)!: a')]).bump, 'major')
    assert.equal(planRelease([commit('fix(AW-1): a', 'BREAKING CHANGE: slugs moved')]).bump, 'major')
  })

  it('lets a hand-picked bump raise the version but never lower it', () => {
    assert.equal(planRelease([commit('fix(AW-1): a')], 'minor').bump, 'minor')
    assert.equal(planRelease([commit('feat(AW-1)!: a')], 'patch').bump, 'major')
  })

  it('counts wrong-format commits as patch and warns about them', () => {
    const plan = planRelease([commit('feat (AW-404): google ads conversion api (#384)')])
    assert.equal(plan.bump, 'patch')
    assert.equal(plan.warnings.length, 1)
    assert.match(plan.warnings[0], /^abc1234 feat \(AW-404\)/)
  })
})

describe('changelog', () => {
  const changelog = [
    '# Change Log',
    '',
    '## [Unreleased] - yyyy-mm-dd',
    '',
    '- template line',
    '',
    '## [1.35.0] - 2026-08-28',
    '',
    '- feat (AW-400): add strapi single type LLM\'s (#382)',
    '',
  ].join('\n')

  it('writes one line per commit subject, without hashes', () => {
    assert.equal(
      changelogSection('1.36.0', '2026-09-10', [commit('feat(AW-1): a (#1)'), commit('fix(AW-2): b (#2)')]),
      '## [1.36.0] - 2026-09-10\n\n- feat(AW-1): a (#1)\n- fix(AW-2): b (#2)\n',
    )
  })

  it('puts the new section above the newest release and below the template', () => {
    const section = changelogSection('1.36.0', '2026-09-10', [commit('fix(AW-2): b')])
    assert.equal(
      insertSection(changelog, section),
      [
        '# Change Log',
        '',
        '## [Unreleased] - yyyy-mm-dd',
        '',
        '- template line',
        '',
        '## [1.36.0] - 2026-09-10',
        '',
        '- fix(AW-2): b',
        '',
        '## [1.35.0] - 2026-08-28',
        '',
        '- feat (AW-400): add strapi single type LLM\'s (#382)',
        '',
      ].join('\n'),
    )
  })

  it('refuses a changelog with no release heading', () => {
    assert.throws(() => insertSection('# Change Log\n', 'x'))
  })
})

describe('isReleaseCommit', () => {
  it('knows the workflow release commit and the old manual one', () => {
    assert.equal(isReleaseCommit('chore(release): 1.36.0'), true)
    assert.equal(isReleaseCommit('chore: changelog'), true)
    assert.equal(isReleaseCommit('chore: changelog typo'), false)
    assert.equal(isReleaseCommit('chore(deps): bump next'), false)
  })
})

describe('compareVersions', () => {
  it('compares each part as a number', () => {
    assert.ok(compareVersions('1.10.0', '1.9.0') > 0)
    assert.ok(compareVersions('1.35.0', '2.0.0') < 0)
    assert.equal(compareVersions('1.35.0', '1.35.0'), 0)
  })
})

describe('release-notes.mjs in a git repo', () => {
  const script = fileURLToPath(new URL('./release-notes.mjs', import.meta.url))

  function repo() {
    const dir = mkdtempSync(join(tmpdir(), 'release-notes-'))
    const env = {
      ...process.env,
      GIT_AUTHOR_NAME: 'Test',
      GIT_AUTHOR_EMAIL: 'test@example.com',
      GIT_COMMITTER_NAME: 'Test',
      GIT_COMMITTER_EMAIL: 'test@example.com',
      GITHUB_OUTPUT: '',
      GITHUB_STEP_SUMMARY: '',
    }
    const git = (...args) => execFileSync('git', ['-c', 'core.hooksPath=/dev/null', ...args], { cwd: dir, env })
    const setVersion = (version) => {
      for (const app of ['nextjs', 'strapi']) {
        mkdirSync(join(dir, app), { recursive: true })
        writeFileSync(join(dir, app, 'package.json'), JSON.stringify({ name: app, version }, null, 2) + '\n')
      }
    }
    const commit = (message) => git('commit', '-q', '--allow-empty', '-m', message)
    const run = () => {
      try {
        return { code: 0, out: execFileSync('node', [script, '--main', 'main', '--dry-run'], { cwd: dir, env, encoding: 'utf8', stdio: 'pipe' }) }
      } catch (error) {
        return { code: error.status, out: `${error.stdout}${error.stderr}` }
      }
    }

    git('init', '-q', '-b', 'main')
    setVersion('1.0.0')
    writeFileSync(join(dir, 'CHANGELOG.md'), '# Change Log\n\n## [1.0.0] - 2026-01-01\n')
    git('add', '.')
    commit('chore: changelog')
    git('switch', '-q', '-c', 'develop')
    return { dir, git, setVersion, commit, run }
  }

  it('lists a commit merged into develop while the last release PR was open', () => {
    const r = repo()
    r.commit('fix(AW-1): a')
    r.setVersion('1.1.0')
    r.git('add', '.')
    r.commit('chore(release): 1.1.0')
    r.commit('feat(AW-2): merged while the release pr was open')
    r.git('switch', '-q', 'main')
    r.git('merge', '-q', '--no-ff', '-m', 'Merge pull request #1 from adfinis/develop', 'develop')
    r.git('switch', '-q', 'develop')
    r.commit('fix(AW-3): c')

    const { code, out } = r.run()
    assert.equal(code, 0, out)
    assert.match(out, /1\.1\.0 -> 1\.2\.0/)
    assert.match(out, /- feat\(AW-2\): merged while the release pr was open/)
    assert.match(out, /- fix\(AW-3\): c/)
    assert.doesNotMatch(out, /- fix\(AW-1\): a/)
  })

  it('stops when develop has a release commit that main does not have yet', () => {
    const r = repo()
    r.commit('feat(AW-1): a')
    r.setVersion('1.1.0')
    r.git('add', '.')
    r.commit('chore(release): 1.1.0')
    r.commit('fix(AW-2): b')

    const { code, out } = r.run()
    assert.equal(code, 1)
    assert.match(out, /already has release commit .* for 1\.1\.0, but main is still at 1\.0\.0/)
  })

  it('uses main as the start when there has never been a release commit', () => {
    const r = repo()
    r.git('switch', '-q', 'main')
    r.git('commit', '-q', '--amend', '-m', 'initial')
    r.git('switch', '-q', '-C', 'develop')
    r.commit('feat(AW-1): a')

    const { code, out } = r.run()
    assert.equal(code, 0, out)
    assert.match(out, /1\.0\.0 -> 1\.1\.0/)
  })
})

describe('releaseDate', () => {
  it('uses the Amsterdam date, not UTC', () => {
    assert.equal(releaseDate(new Date('2026-09-10T22:30:00Z')), '2026-09-11')
    assert.equal(releaseDate(new Date('2026-01-10T22:30:00Z')), '2026-01-10')
  })
})
