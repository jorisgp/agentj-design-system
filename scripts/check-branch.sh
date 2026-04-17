echo "\n🛡️ Husky(Branch Name) -  Check branch name\n"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
. "$SCRIPT_DIR/_config.sh"

git fetch origin
LOCAL_BRANCH=$(git symbolic-ref --short -q HEAD)
if [ -z "$LOCAL_BRANCH" ]; then
  echo "Not on a valid local branch (HEAD is detached or repo is empty) ❌"
  exit 1
fi

if ! echo "$LOCAL_BRANCH" | grep -Eq  "$GIT_CONVENTIONAL_BRANCH_REGEX";  then
  echo "❌ Husky(Branch Name) - Invalid branch name: '$LOCAL_BRANCH'\n"

  echo "☑️ Allowed branch name formats:\n"
  echo "    - feature/%s-<number>-<kebab-case>"
  echo "    - bugfix/$STORY_KEY-<number>-<kebab-case>" 
  echo "    - hotfix/$STORY_KEY-<number>-<kebab-case>" 
  echo "    - refactor/$STORY_KEY-<number>-<kebab-case>"
  echo "    - release/release-changelog-x.y.z\n"

  echo "📌 Valid examples:\n"
  echo "    - feature/$STORY_KEY-123-login-button"
  echo "    - bugfix/$STORY_KEY-456-fix-title-spacing"
  echo "    - hotfix/$STORY_KEY-789-patch-infinite-loop"
  echo "    - release/release-changelog-1.2.3\n"

  echo "👉 To rename your branch:"
  echo "💾 git branch -m <valid-branch-name>"
  echo "🌎 https://conventional-branch.github.io/"
  exit 1
fi
echo "✅ Husky(Branch Name) - Branch name is valid: '$LOCAL_BRANCH'"
echo
