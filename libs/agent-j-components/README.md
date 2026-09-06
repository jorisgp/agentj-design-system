# @agentj-nl/agent-j-components

Angular component library for the AGENTJ design system.

## Build

```sh
pnpm nx build agent-j-components
```

Build output:

`dist/libs/agent-j-components`

## Publish to npm.

1. Login once:

```sh
npm login
```

2. Build the package:

```sh
pnpm nx build agent-j-components
```

3. Publish:

```sh
npm publish dist/libs/agent-j-components --access public
```

## Use in another app

```sh
npm install @agentj-nl/agent-j-components
```
