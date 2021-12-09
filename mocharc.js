module.exports = {
  diff: true,
  extension: ['js'],
  package: './package.json',
  reporter: 'dot',
  slow: 75,
  timeout: 2000,
  ui: 'bdd',
  color: true,
  'inline-diffs': false,
  spec: ['test/*.test.js']
};
