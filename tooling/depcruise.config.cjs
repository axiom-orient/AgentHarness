/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: 'no-ui-to-repo',
      comment: 'UI must not depend directly on repo.',
      severity: 'error',
      from: { path: '^packages/.*/ui/' },
      to: { path: '^packages/.*/repo/' },
    },
    {
      name: 'no-service-to-ui',
      comment: 'Service must not depend on UI.',
      severity: 'error',
      from: { path: '^packages/.*/service/' },
      to: { path: '^packages/.*/ui/' },
    },
    {
      name: 'no-runtime-to-types-via-ui',
      comment: 'Runtime should not reach types through UI paths.',
      severity: 'warn',
      from: { path: '^packages/.*/runtime/' },
      to: { path: '^packages/.*/ui/' },
    },
  ],
  options: {
    doNotFollow: { path: 'node_modules' },
    tsPreCompilationDeps: true,
    combinedDependencies: true,
  },
};
