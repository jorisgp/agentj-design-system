# @agentj/agentj-design-system

Angular component library for the AGENTJ design system.

## Build

```sh
pnpm nx build agentj-components
```

Build output:

`dist/libs/agentj-design-system-components`

## Publish to npm

1. Login once:

```sh
npm login
```

2. Build the package:

```sh
pnpm nx build agentj-components
```

3. Publish:

```sh
npm publish dist/libs/agentj-design-system-components --access public
```

## Use in another app

```sh
npm install @agentj/agentj-design-system
```
