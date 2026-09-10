import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  changelogSection,
  higherBump,
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

describe('releaseDate', () => {
  it('uses the Amsterdam date, not UTC', () => {
    assert.equal(releaseDate(new Date('2026-09-10T22:30:00Z')), '2026-09-11')
    assert.equal(releaseDate(new Date('2026-01-10T22:30:00Z')), '2026-01-10')
  })
})
