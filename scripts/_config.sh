STORY_KEY=JP
DEFAULT_BRANCH="main"
GIT_CONVENTIONAL_COMMIT_REGEX="^(feat|fix|chore|docs|style|refactor|perf|test|build|ci|revert|merge)(\('"$STORY_KEY"'-[0-9_-]+\))?: [a-z ]+$"
GIT_CONVENTIONAL_BRANCH_REGEX="^(feature|bugfix|hotfix|refactor)/$STORY_KEY-[0-9]+-[a-z0-9-]+$|^release/release-changelog-[0-9]+\.[0-9]+\.[0-9]+$"
LINT_FILES='\.(js|ts|jsx|tsx)$'
PRETTIER_FILES='\.(js|ts|jsx|tsx|json|md|css|scss|html|yml|yaml)$'