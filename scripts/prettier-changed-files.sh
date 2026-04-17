echo "\n🛡️ Husky(Prettier) - Check formatting on staged files \n"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
. "$SCRIPT_DIR/_config.sh"

  CHANGED_FILES=$(git diff --name-only origin/$DEFAULT_BRANCH...HEAD \
  | grep -E $PRETTIER_FILES)

if [ -n "$CHANGED_FILES" ]; then
  PRETTIER_CHECK_OUTPUT=$(echo "$CHANGED_FILES" | xargs npx prettier --check 2>&1)
  PRETTIER_EXIT_CODE=$?
  
  if [ $PRETTIER_EXIT_CODE -ne 0 ]; then
    echo "❌ Husky(Prettier) - Prettier found formatting issues in the following files:\n"
    echo "$CHANGED_FILES" | xargs npx prettier --write
    echo
    exit 1
  else
    echo "✅ Husky(Prettier) - All staged files are properly formatted"
  fi
else
  echo "✅ Husky(Prettier) - No staged files to format"
fi
echo 
