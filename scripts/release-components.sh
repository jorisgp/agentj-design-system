#!/usr/bin/env bash
set -euo pipefail

SOURCE_BRANCH="develop"
RELEASE_DATE="${RELEASE_DATE:-$(date +%Y%m%d)}"
RELEASE_SEQUENCE="${RELEASE_SEQUENCE:-01}"
RELEASE_BRANCH="release/components/${RELEASE_DATE}-${RELEASE_SEQUENCE}"

usage() {
  cat <<'USAGE'
Usage:
  pnpm release:components

Environment:
  RELEASE_DATE=20260101  Override the release branch date.
  RELEASE_SEQUENCE=01    Override the release branch sequence.
USAGE
}

if [[ "${1:-}" == "-h" || "${1:-}" == "--help" ]]; then
  usage
  exit 0
fi

if [[ "$#" -gt 0 ]]; then
  usage
  exit 1
fi

if [[ -n "$(git status --porcelain)" ]]; then
  echo "Working tree is not clean. Commit or stash changes before requesting a release." >&2
  exit 1
fi

if git rev-parse --verify "${RELEASE_BRANCH}" >/dev/null 2>&1 ||
  git ls-remote --exit-code --heads origin "${RELEASE_BRANCH}" >/dev/null 2>&1; then
  echo "Release branch already exists: ${RELEASE_BRANCH}" >&2
  exit 1
fi

git switch "${SOURCE_BRANCH}"
git pull --ff-only origin "${SOURCE_BRANCH}"
git switch -c "${RELEASE_BRANCH}"
git push -u origin "${RELEASE_BRANCH}"

cat <<NEXT_STEPS

Release requested by creating:

  ${RELEASE_BRANCH}

GitHub Actions will prepare the release PR.
NEXT_STEPS
