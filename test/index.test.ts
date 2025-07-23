import { FlatConfigComposer } from 'eslint-flat-config-utils';
import { describe, expect, it } from 'vitest';
import { defineConfig } from '../src';

describe('composer', () => {
  it('should return composer instance', () => {
    const config = defineConfig();
    expect(config).toBeInstanceOf(FlatConfigComposer);
  });

  it.each(['clone', 'remove', 'append', 'prepend', 'replace', 'override', 'overrideRules', 'renamePlugins'])(
    'should have method %s',
    (method) => {
      const config = defineConfig();
      expect(config[method as keyof typeof config]).toBeInstanceOf(Function);
    }
  );
});
