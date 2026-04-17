echo "\n🛡️ Husky(Lint) - Linting staged files \n"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
. "$SCRIPT_DIR/_config.sh"

git fetch origin $DEFAULT_BRANCH

CHANGED_FILES=$(git diff --name-only origin/$DEFAULT_BRANCH...HEAD \
  | grep -E $LINT_FILES)

FILE_ARRAY=()
while IFS= read -r file; do
  [ -n "$file" ] && FILE_ARRAY+=("$file")
done <<< "$CHANGED_FILES"

if [ ${#FILE_ARRAY[@]} -gt 0 ]; then
  echo "Linting the following files:"
  printf '%s\n' "${FILE_ARRAY[@]}"
  
  OUTPUT=$(npx eslint --format stylish "${FILE_ARRAY[@]}" 2>&1)
  STATUS=$?
  
  echo "$OUTPUT"
  
  if [ $STATUS -eq 0 ]; then
    echo "✅ Husky(Lint) - ESLint passed with no issues\n"
  else
    echo "❌ Husky(Lint) - ESLint reported issues\n"
    exit $STATUS
  fi
else
  echo "✅ Husky(Lint) - No committed JS/TS file changes to lint"
  echo
fi
