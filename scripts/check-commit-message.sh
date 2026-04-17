echo "\n🛡️ Husky(check commit) - Check commit message\n"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
. "$SCRIPT_DIR/_config.sh"

COMMIT_MSG="$(cat "$1")"

if ! echo "$COMMIT_MSG" | grep -qE "$GIT_CONVENTIONAL_COMMIT_REGEX"; then
  echo "❌ Husky(check commit) - Invalid commit message: '$COMMIT_MSG'\n"
  echo "☑️  Allowed commit message name formats:\n"
  echo "-  <type>(<story-key>-<number>): <description-lowercase>\n"

  echo "📌  Valid examples:\n"
  echo "    - feat(${STORY_KEY}-123): add login button"
  echo "    - fix(${STORY_KEY}-456): correct title spacing"
  echo "    - docs(${STORY_KEY}-789): update api documentation"
  echo "    - release(${STORY_KEY}-1.2.3): release version 1.2.3\n"

  echo "👉 To fix your commit message:" 
  echo "💾 git commit --amend -m '<valid-commit-message>'"
  echo "🌎 https://www.conventionalcommits.org/en/v1.0.0/\n"
  echo
  exit 1
fi

echo "✅ Husky(check commit) - Commit message is valid: '$COMMIT_MSG'"
echo