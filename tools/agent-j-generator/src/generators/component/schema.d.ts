export interface ComponentGeneratorSchema {
  name?: string;
  library?: string;
  directory?: 'primitives' | 'features' | 'ui-components';
  skipTests?: boolean;
}
