import { componentGenerator as angularComponentGenerator } from "@nx/angular/generators";
import { formatFiles, names, Tree } from "@nx/devkit";
import { stdin as input, stdout as output } from "node:process";
import * as readline from "node:readline/promises";
import { ComponentGeneratorSchema } from "./schema";

async function selectOption(
  prompt: string,
  options: string[],
  defaultOption: string,
) {
  if (!process.stdin.isTTY || !process.stdout.isTTY) {
    return defaultOption;
  }

  const rl = readline.createInterface({ input, output });
  const defaultIndex = options.indexOf(defaultOption);

  output.write(`${prompt}\n`);
  options.forEach((option, index) => {
    const marker = index === defaultIndex ? " (default)" : "";
    output.write(`  ${index + 1}. ${option}${marker}\n`);
  });

  const answer = await rl.question(
    `Enter number (1-${options.length}) [${defaultIndex + 1}]: `,
  );
  rl.close();

  const trimmed = answer.trim();
  if (trimmed === "") {
    return defaultOption;
  }

  const selectedIndex = Number.parseInt(trimmed, 10) - 1;
  if (
    Number.isNaN(selectedIndex) ||
    selectedIndex < 0 ||
    selectedIndex >= options.length
  ) {
    throw new Error(
      `Invalid selection "${answer}". Choose a number between 1 and ${options.length}.`,
    );
  }

  return options[selectedIndex];
}

async function promptForName() {
  if (!process.stdin.isTTY || !process.stdout.isTTY) {
    throw new Error(
      "Component name is required in non-interactive mode. Pass --name=<component-name>.",
    );
  }

  const rl = readline.createInterface({ input, output });
  const answer = await rl.question("Enter component name: ");
  rl.close();

  const trimmed = answer.trim();
  if (!trimmed) {
    throw new Error("Component name cannot be empty.");
  }

  return trimmed;
}

export async function componentGenerator(
  tree: Tree,
  options: ComponentGeneratorSchema,
) {
  const directoryOptions: NonNullable<ComponentGeneratorSchema["directory"]>[] =
    ["primitives", "features", "ui-components"];
  const existingLibraries = tree.exists("libs")
    ? tree
        .children("libs")
        .filter((libraryName) =>
          tree.exists(`libs/${libraryName}/project.json`),
        )
    : [];

  if (existingLibraries.length === 0) {
    throw new Error('No libraries found in "libs". Cannot generate component.');
  }

  const defaultLibrary = existingLibraries.includes("fs-components")
    ? "fs-components"
    : existingLibraries[0];
  const library =
    options.library ??
    (await selectOption("Select library:", existingLibraries, defaultLibrary));

  if (!existingLibraries.includes(library)) {
    throw new Error(
      `Invalid library "${library}". Choose one of: ${existingLibraries.join(", ")}`,
    );
  }

  const directory =
    options.directory ??
    ((await selectOption(
      "Select component section:",
      directoryOptions,
      "primitives",
    )) as NonNullable<ComponentGeneratorSchema["directory"]>);

  if (!directoryOptions.includes(directory)) {
    throw new Error(
      `Invalid directory "${directory}". Choose one of: ${directoryOptions.join(", ")}`,
    );
  }

  const componentNames = names(options.name ?? (await promptForName()));
  const name = componentNames.fileName;
  const componentPath = `src/lib/${directory}/${name}`;
  const componentFilePath = `libs/${library}/${componentPath}/${name}`;
  const storyFilePath = `libs/${library}/${componentPath}/${name}.stories.ts`;
  const sectionBarrelPath = `libs/${library}/src/lib/${directory}/index.ts`;
  const componentExport = `export * from './${name}/${name}';`;

  await angularComponentGenerator(tree, {
    path: componentFilePath,
    standalone: true,
    style: "scss",
    export: false,
    skipTests: options.skipTests,
    skipFormat: true,
  });

  if (!tree.exists(storyFilePath)) {
    const libraryPrefix =
      library === "agentj-components"
        ? "Agentj"
        : library === "dep-components"
          ? "Dep Components"
          : library === "fs-components"
            ? "Field Services"
            : names(library).className;
    const titlePrefix =
      directory === "ui-components"
        ? "UI Components"
        : directory === "features"
          ? "Features"
          : "Primitives";

    tree.write(
      storyFilePath,
      `import type { Meta, StoryObj } from '@storybook/angular';\n\nimport { ${componentNames.className} } from './${name}';\n\nconst meta: Meta<${componentNames.className}> = {\n  title: '${libraryPrefix}/${titlePrefix}/${componentNames.className}',\n  component: ${componentNames.className},\n  tags: ['autodocs'],\n  argTypes: {\n    \n  },\n};\n\nexport default meta;\n\ntype Story = StoryObj<${componentNames.className}>;\n\nexport const Default: Story = {\n  args: {},\n};\n`,
    );
  }

  const barrelContent = tree.exists(sectionBarrelPath)
    ? (tree.read(sectionBarrelPath, "utf-8") ?? "")
    : "";

  if (!barrelContent.includes(componentExport)) {
    const normalized = barrelContent.trim();
    const nextContent = normalized
      ? `${normalized}\n${componentExport}\n`
      : `${componentExport}\n`;
    tree.write(sectionBarrelPath, nextContent);
  }

  await formatFiles(tree);
}

export default componentGenerator;
