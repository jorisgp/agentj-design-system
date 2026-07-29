#!/usr/bin/env bash
set -euo pipefail

PROJECT="agent-j-components"
GROUP="components"
SOURCE_BRANCH="develop"
TARGET_BRANCH="main"
RELEASE_DATE="${RELEASE_DATE:-$(date +%F)}"
RELEASE_BRANCH="release/components/${RELEASE_DATE}"
PACKAGE_JSON="libs/agent-j-components/package.json"

usage() {
  cat <<'USAGE'
Usage:
  pnpm release:components <patch|minor|major|prepatch|preminor|premajor|prerelease> ["Release note"]

Example:
  pnpm release:components patch "Prepare agent-j-components release"
  pnpm release:components patch

Environment:
  RELEASE_DATE=2026-01-01  Override the release branch date.
  SKIP_PR=1                Skip GitHub PR creation even when gh is installed.
USAGE
}

if [[ "${1:-}" == "-h" || "${1:-}" == "--help" ]]; then
  usage
  exit 0
fi

BUMP="${1:-}"

if [[ -z "${BUMP}" ]]; then
  usage
  exit 1
fi

case "${BUMP}" in
  major | premajor | minor | preminor | patch | prepatch | prerelease) ;;
  *)
    echo "Invalid bump: ${BUMP}" >&2
    usage
    exit 1
    ;;
esac

RELEASE_NOTE="${2:-Prepare ${PROJECT} release}"
CURRENT_BRANCH="$(git branch --show-current)"

if [[ -n "$(git status --porcelain)" ]]; then
  echo "Working tree is not clean. Commit or stash changes before releasing." >&2
  exit 1
fi

if [[ "${CURRENT_BRANCH}" == "${RELEASE_BRANCH}" ]]; then
  echo "Continuing on existing release branch: ${RELEASE_BRANCH}"
elif git rev-parse --verify "${RELEASE_BRANCH}" >/dev/null 2>&1; then
  echo "Release branch already exists: ${RELEASE_BRANCH}" >&2
  echo "Check it out and rerun this command from that branch." >&2
  exit 1
else
  if ! git rev-parse --verify "${SOURCE_BRANCH}" >/dev/null 2>&1; then
    git fetch origin "${SOURCE_BRANCH}:${SOURCE_BRANCH}"
  fi

  git checkout "${SOURCE_BRANCH}"
  git pull --ff-only origin "${SOURCE_BRANCH}"
  git fetch origin "${TARGET_BRANCH}" --tags
  git checkout -b "${RELEASE_BRANCH}"
fi

pnpm nx release plan "${BUMP}" \
  --groups "${GROUP}" \
  --message "${RELEASE_NOTE}" \
  --onlyTouched=false

pnpm nx release \
  --groups "${GROUP}" \
  --dry-run \
  --skip-publish

pnpm nx release version \
  --groups "${GROUP}"

pnpm nx release changelog \
  --groups "${GROUP}"

VERSION="$(node -e "console.log(require('./${PACKAGE_JSON}').version)")"
TAG="${PROJECT}@${VERSION}"

git add "${PACKAGE_JSON}" .nx/version-plans "libs/agent-j-components/CHANGELOG.md"
git commit -m "release(${PROJECT}): ${VERSION}"
git push -u origin "${RELEASE_BRANCH}"

if [[ "${SKIP_PR:-0}" != "1" ]] && command -v gh >/dev/null 2>&1; then
  gh pr create \
    --base "${TARGET_BRANCH}" \
    --head "${RELEASE_BRANCH}" \
    --title "Release ${PROJECT} ${VERSION}" \
    --body "Release ${PROJECT} ${VERSION}"
else
  echo "Open PR manually: ${RELEASE_BRANCH} -> ${TARGET_BRANCH}"
fi

cat <<NEXT_STEPS

Release preparation is committed on ${RELEASE_BRANCH}.

After the PR is merged to ${TARGET_BRANCH}, run:

  git checkout ${TARGET_BRANCH}
  git pull --ff-only origin ${TARGET_BRANCH}
  git tag ${TAG}
  git push origin ${TAG}
  git checkout ${SOURCE_BRANCH}
  git pull --ff-only origin ${SOURCE_BRANCH}
  git merge --ff-only origin/${TARGET_BRANCH}
  git push origin ${SOURCE_BRANCH}

The tag push triggers package publishing.
NEXT_STEPS
