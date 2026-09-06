# agent-j-style

Shared design tokens for Agent J. This framework-independent package contains the existing light and dark color and shadow tokens, plus a Tailwind CSS 3 preset for brand colors, font families, shadows, and border radius.

## CSS tokens

Import once in your global stylesheet:

```css
@import '@agent-j/style/tokens.css';
```

```css
.card {
  color: var(--agentj-color-text);
  background: var(--agentj-color-surface);
  border: 1px solid var(--agentj-color-border);
  box-shadow: var(--agentj-shadow-sm);
}
```

Tokens default to light mode, follow `prefers-color-scheme: dark`, and support a `.dark` ancestor for explicit dark mode. Override custom properties after the import to customize a theme. The stylesheet contains no reset or font downloads.

## Tailwind

```js
module.exports = {
  presets: [require('@agent-j/style/tailwind-preset')],
  content: ['./src/**/*.{html,ts}'],
};
```

The preset preserves `brand-50` through `brand-900`, `font-sans`, `font-serif`, `shadow-agentj-sm`, `shadow-agentj-md`, and `rounded-agentj`. Load Open Sans and Playfair Display in the consuming application. Tailwind shadows retain their existing values, which differ from the theme-aware CSS shadows.

## Build

```sh
pnpm nx build agent-j-style
npm pack ./dist/libs/agent-j-style
```

Edit `src/tokens.css` for theme tokens and `tailwind-preset.cjs` for Tailwind foundations. The application uses the source stylesheet and the root Tailwind configuration consumes this preset directly.
