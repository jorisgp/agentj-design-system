# Agents

## Code Style Rules

- **No comments** in source files
- **No emojis/smileys** in source files
- **Angular components** must always consist of exactly 4 files: `.ts`, `.html`, `.scss`, `.spec.ts`
- \*\*Angular scss classes must start with agentjds
- **Always use `.scss`** for styles — never `.css`
- **Tests must use Vitest** — never Jest or other test frameworks
- **Component selectors must start with `agentjds-`** — e.g. `agentjds-button`, `agentjds-form-field`

## Architecture Principles

### Primitives Layer

- **No imports** from other layers
- Self-contained, reusable building blocks
- Example: buttons, inputs, cards, badges

### Composites Layer

- **Only imports** from primitives
- Composes primitives into components more functional than primitives
- Example: icon-buttons

### UI Components Layer

- **Only imports** from primitives and composites
- Composes more functional building blocks but still dumb components
- Example: header-menu, table

### Features

- Can import from UI components, composites and primitives
- Can contain state, API calls, business-logic
- Example: grid, file-overview

## Structure

```
components/
├── primitives/          # No dependencies
│   ├── button/
│   ├── input/
│   └── ...
├── composites/          # Import only primitives
│   ├── icon-button/
│   └── ...
├── ui-components/       # Import only primitives and composites
│   ├── form-field/
│   ├── data-table/
│   └── ...
└── features/            # Can import from all layers
    └── ...
```
