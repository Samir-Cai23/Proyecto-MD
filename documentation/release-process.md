# Release process

This repository uses **Release Please** to automate GitHub releases from Conventional Commit messages.

## How it works

1. A normal feature/fix PR is merged into `main`.
2. The `release-please` GitHub Action reads commit messages on `main`.
3. Release Please opens or updates a **Release PR** with:
   - version bumps in `package.json`, `package-lock.json`, and `.release-please-manifest.json`
   - generated release notes in `CHANGELOG.md`
4. When the Release PR is merged, Release Please creates the GitHub Release and tag, for example `v2.0.1`.

Release Please does **not** publish a new release for every merge immediately. It keeps a release PR ready, then the maintainer decides when to merge that release PR.

## Commit message rules

Use Conventional Commits so Release Please can choose the correct semantic version bump.

| Commit type | Version effect | Example |
| --- | --- | --- |
| `fix:` | Patch release | `fix: keep challenge score after reload` |
| `feat:` | Minor release | `feat: add onboarding tutorial` |
| `perf:` | Patch release | `perf: reduce initial bundle size` |
| `docs:` | Usually no release unless configured as releasable | `docs: add roadmap` |
| `chore:` | Usually no release | `chore: update tooling` |
| `feat!:` or `BREAKING CHANGE:` | Major release | `feat!: redesign level data format` |

## Repository setup

Release Please is configured by:

- `.github/workflows/release-please.yml`
- `release-please-config.json`
- `.release-please-manifest.json`

The current baseline version is:

```text
2.0.0
```

The release history is bootstrapped from the V2 production baseline commit:

```text
30fd0486735147121317cdceb7fa2c19c4e726c7
```

That means future Release Please PRs should only describe changes merged after the V2 final baseline.

## Required GitHub setting

If Release Please does not open a PR after a releasable commit lands on `main`, check this setting:

```text
Settings → Actions → General → Workflow permissions
```

Recommended setting:

```text
Read and write permissions
Allow GitHub Actions to create and approve pull requests
```

The workflow uses the default `GITHUB_TOKEN`. That is enough for GitHub releases and Release PRs in this repository.

## Initial release note

If the repository has no GitHub releases yet, create the first `v2.0.0` release from the V2 final `main` commit. After that, let Release Please manage future releases.

## Maintainer checklist

Before merging a Release PR:

- [ ] Confirm the generated version is correct.
- [ ] Read `CHANGELOG.md` and remove anything noisy if needed.
- [ ] Confirm Vercel production is healthy after the original feature/fix PRs.
- [ ] Merge the Release PR.
- [ ] Confirm the GitHub Release appears under the repository Releases page.

## Example flow

```text
feat: add onboarding tutorial
```

After merge to `main`, Release Please opens a Release PR for a minor version bump, for example:

```text
v2.1.0
```

```text
fix: correct XNOR challenge feedback
```

After merge to `main`, Release Please opens or updates a Release PR for a patch version bump, for example:

```text
v2.0.1
```
