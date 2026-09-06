# @agent-j/husky-checks

Gitflow-oriented Husky checks for Agent J repositories.

## Checks

- `agentj-check-branch-name`: validates the current branch name.
- `agentj-check-commit-message <commit-msg-file>`: validates a commit message file.

Commit messages must follow Conventional Commits. Standard Git merge subjects
(`Merge branch ...`, remote-tracking branches, tags, commits, and GitHub
`Merge pull request ...` messages) are also accepted.
