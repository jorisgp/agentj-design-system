#!/usr/bin/env bash
set -euo pipefail

SOURCE_BRANCH="develop"
RELEASE_DATE="${RELEASE_DATE:-$(date +%Y%m%d)}"
RELEASE_SEQUENCE="${RELEASE_SEQUENCE:-01}"
RELEASE_BRANCH_PREFIX="release/components/${RELEASE_DATE}"

usage() {
  cat <<'USAGE'
Usage:
  pnpm release:components

Environment:
  RELEASE_DATE=20260101  Override the release branch date.
  RELEASE_SEQUENCE=01    Override the release branch sequence.
  SKIP_PR=1              Skip GitHub PR creation.
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

branch_exists() {
  git rev-parse --verify "$1" >/dev/null 2>&1 ||
    git ls-remote --exit-code --heads origin "$1" >/dev/null 2>&1
}

next_release_branch() {
  local sequence_number=$((10#${RELEASE_SEQUENCE}))
  local branch

  while true; do
    branch="$(printf '%s-%02d' "${RELEASE_BRANCH_PREFIX}" "${sequence_number}")"

    if ! branch_exists "${branch}"; then
      echo "${branch}"
      return
    fi

    echo "Release branch already exists: ${branch}" >&2
    sequence_number=$((sequence_number + 1))
  done
}

RELEASE_BRANCH="$(next_release_branch)"

git switch "${SOURCE_BRANCH}"
git pull --ff-only origin "${SOURCE_BRANCH}"
git switch -c "${RELEASE_BRANCH}"
git push -u origin "${RELEASE_BRANCH}"

if [[ "${SKIP_PR:-0}" != "1" ]] && command -v gh >/dev/null 2>&1; then
  gh pr create \
    --base main \
    --head "${RELEASE_BRANCH}" \
    --title "Release agent-j-components" \
    --body "Release request for agent-j-components. GitHub Actions will add the generated version and changelog commit."
else
  echo "Open PR manually: ${RELEASE_BRANCH} -> main"
fi

cat <<NEXT_STEPS

Release requested by creating:

  ${RELEASE_BRANCH}

GitHub Actions will prepare the release commit and update the release PR.
NEXT_STEPS
