import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { bumpFor, checkMessage } from './commit-convention.mjs'

describe('checkMessage', () => {
  const valid = [
    'feat(AW-404): add google ads conversion api',
    'fix(AW-380): missing url option in form spark',
    'perf(AW-1): lazy load highlight.js',
    'refactor(AW-388): remove duplicates',
    'chore(deps): bump linkify-it and @strapi/strapi in /strapi',
    'chore(release): 1.36.0',
    'fix(AW-2): 404 page shows the right language',
    'docs: explain the release workflow',
    'ci: check commit messages on pull requests',
    'build(deps-dev): bump vitest',
    'feat(AW-1)!: drop the old event api',
  ]

  for (const message of valid) {
    it(`accepts "${message}"`, () => {
      assert.deepEqual(checkMessage(message).errors, [])
    })
  }

  const invalid = [
    ['feat (AW-404): google ads conversion api (#384)', ['no space between the type and "("']],
    ['Feat(AW-1): add x', ['the type must be lowercase: "feat"']],
    ['hotfix(AW-367): reddit v2 capi', ['"hotfix" is not a type; use one of:']],
    ['feat: [AW-332] Change width to container', ['"feat" needs a Jira key', 'must start with a lowercase letter']],
    ['feat AW-386 add sentry profiling', ['"feat" needs a Jira key', 'a colon must follow']],
    ['fix(aw-12): add x', ['the Jira key must be in capitals: "AW-12"']],
    ['chore(Deps): bump x', ['the scope must be one Jira key']],
    ['feat(AW-1):add x', ['exactly one space after the colon']],
    ['feat(AW-1):  add x', ['exactly one space after the colon']],
    ['feat(AW-1): add x.', ['must not end with a full stop']],
    ['docs : add x', ['no space between the type and the colon']],
    ['feat(AW-1): ', ['the description is missing']],
    [`chore: ${'a'.repeat(100)}`, ['the header is 107 characters']],
    ['', ['the header must start with a type']],
    ['AW-399 add consent banner', ['"AW" is not a type']],
  ]

  for (const [message, expected] of invalid) {
    it(`refuses "${message.slice(0, 60)}"`, () => {
      const { errors } = checkMessage(message)
      for (const part of expected) {
        assert.ok(
          errors.some((error) => error.includes(part)),
          `expected an error containing "${part}", got ${JSON.stringify(errors)}`,
        )
      }
    })
  }

  it('names every broken rule at once', () => {
    const { errors } = checkMessage('Feat (AW-1): Add x.')
    assert.equal(errors.length, 4)
  })

  it('skips merge, revert and fixup commits', () => {
    for (const message of [
      "Merge branch 'AW-367-debugs' into develop",
      'Merge pull request #383 from adfinis/develop',
      'Revert "feat(AW-1): add x"',
      'fixup! feat(AW-1): add x',
      'squash! feat(AW-1): add x',
    ]) {
      const result = checkMessage(message)
      assert.equal(result.skipped, true, message)
      assert.deepEqual(result.errors, [], message)
    }
  })

  it('ignores git comment lines and leading blank lines', () => {
    const file = '\n\nfeat(AW-1): add x\n\n# Please enter the commit message\n# Lines starting with # are ignored'
    assert.deepEqual(checkMessage(file).errors, [])
  })

  it('stops reading at the scissors line of a verbose commit', () => {
    const file =
      'fix(AW-1): add x\n# ------------------------ >8 ------------------------\ndiff --git a/x b/x\nBREAKING CHANGE: not a footer'
    const result = checkMessage(file)
    assert.deepEqual(result.errors, [])
    assert.equal(result.breaking, false)
  })

  it('treats a bang as breaking', () => {
    assert.equal(checkMessage('fix(AW-1)!: change the api').breaking, true)
  })

  it('treats a BREAKING CHANGE line in the body as breaking', () => {
    assert.equal(checkMessage('fix(AW-1): change the api\n\nBREAKING CHANGE: slugs moved').breaking, true)
    assert.equal(checkMessage('fix(AW-1): change the api\n\nBREAKING-CHANGE: slugs moved').breaking, true)
  })

  it('does not treat a mention of breaking change as breaking', () => {
    assert.equal(checkMessage('fix(AW-1): avoid a breaking change\n\nno BREAKING CHANGE here').breaking, false)
  })
})

describe('bumpFor', () => {
  it('gives major for a breaking change, whatever the type', () => {
    assert.equal(bumpFor(checkMessage('chore!: drop node 20')), 'major')
    assert.equal(bumpFor(checkMessage('feat (AW-1)!: wrong format but breaking')), 'major')
  })

  it('gives minor for a feat', () => {
    assert.equal(bumpFor(checkMessage('feat(AW-1): add x')), 'minor')
  })

  it('gives patch for every other type', () => {
    for (const type of ['fix', 'perf', 'refactor']) {
      assert.equal(bumpFor(checkMessage(`${type}(AW-1): change x`)), 'patch')
    }
    for (const type of ['style', 'test', 'docs', 'build', 'ci', 'chore', 'revert']) {
      assert.equal(bumpFor(checkMessage(`${type}: change x`)), 'patch')
    }
  })

  it('gives patch for a wrong-format commit and for skipped ones', () => {
    assert.equal(bumpFor(checkMessage('feat (AW-404): google ads conversion api (#384)')), 'patch')
    assert.equal(bumpFor(checkMessage('Revert "feat(AW-1): add x"')), 'patch')
  })
})
