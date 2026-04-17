echo "\n🛡️  Husky(Test) - Test changed files \n"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
. "$SCRIPT_DIR/_config.sh"

git stash push -k -u -m "husky-prepush-stash"

STASHED=$(git stash list | grep "husky-prepush-stash")

git fetch origin $DEFAULT_BRANCH

CHANGED_TEST_FILES=$(git diff --name-only origin/$DEFAULT_BRANCH...HEAD \
  | grep -E '\.(js|ts|jsx|tsx)$')

if [ -n "$CHANGED_TEST_FILES" ]; then
  echo "🧪 Running tests for changed files:"
  echo "$CHANGED_TEST_FILES"
  npx jest $CHANGED_TEST_FILES
else
  echo "✅ Husky(Test) - No changed test files to run."
fi

if [ -n "$STASHED" ]; then
  git stash pop
fi