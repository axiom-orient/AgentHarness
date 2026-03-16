export default {
  settings: {
    'boundaries/elements': [
      { type: 'types', pattern: 'packages/*/types/**' },
      { type: 'config', pattern: 'packages/*/config/**' },
      { type: 'repo', pattern: 'packages/*/repo/**' },
      { type: 'service', pattern: 'packages/*/service/**' },
      { type: 'runtime', pattern: 'packages/*/runtime/**' },
      { type: 'ui', pattern: 'packages/*/ui/**' },
    ],
  },
  rules: {
    'boundaries/element-types': [
      'error',
      {
        default: 'disallow',
        rules: [
          { from: 'types', allow: [] },
          { from: 'config', allow: ['types'] },
          { from: 'repo', allow: ['types', 'config'] },
          { from: 'service', allow: ['types', 'config', 'repo'] },
          { from: 'runtime', allow: ['types', 'config', 'repo', 'service'] },
          { from: 'ui', allow: ['types', 'service', 'runtime'] },
        ],
      },
    ],
  },
};
