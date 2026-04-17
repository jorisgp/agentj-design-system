import { addProjectConfiguration, Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';

import { componentGenerator } from './component';
import { ComponentGeneratorSchema } from './schema';

describe('component generator', () => {
  let tree: Tree;
  const options: ComponentGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
    addProjectConfiguration(tree, 'fs-components', {
      root: 'libs/fs-components',
      sourceRoot: 'libs/fs-components/src',
      projectType: 'library',
      targets: {},
    });
    tree.write('libs/fs-components/project.json', '{"name":"fs-components"}');
    tree.write(
      'libs/fs-components/src/index.ts',
      "export * from './lib/primitives';\n",
    );
    tree.write(
      'libs/fs-components/src/lib/primitives/index.ts',
      "export * from './button/button';\n",
    );
  });

  it('should run successfully', async () => {
    await componentGenerator(tree, options);
    expect(
      tree.exists('libs/fs-components/src/lib/primitives/test/test.ts'),
    ).toBeTruthy();
    expect(
      tree.exists('libs/fs-components/src/lib/primitives/test/test.html'),
    ).toBeTruthy();
    expect(
      tree.exists('libs/fs-components/src/lib/primitives/test/test.scss'),
    ).toBeTruthy();
    expect(
      tree.exists('libs/fs-components/src/lib/primitives/test/test.stories.ts'),
    ).toBeTruthy();

    const story = tree.read(
      'libs/fs-components/src/lib/primitives/test/test.stories.ts',
      'utf-8',
    );
    expect(story).toContain('const meta: Meta<Test> = {');
    expect(story).toContain("title: 'Field Services/Primitives/Test'");
    expect(story).toContain('argTypes: {');
    expect(story).toContain('type Story = StoryObj<Test>;');

    const primitivesIndex = tree.read(
      'libs/fs-components/src/lib/primitives/index.ts',
      'utf-8',
    );
    expect(primitivesIndex).toContain("export * from './test/test';");

    const rootIndex = tree.read('libs/fs-components/src/index.ts', 'utf-8');
    expect(rootIndex).not.toContain("export * from './lib/primitives/test';");
  });

  it('should throw for a non-existing library', async () => {
    await expect(
      componentGenerator(tree, { ...options, library: 'does-not-exist' }),
    ).rejects.toThrow('Invalid library');
  });
});
