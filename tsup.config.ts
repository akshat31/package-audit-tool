export default {
  entry: ['src/index.ts'],
  format: ['esm'],         // Only ESM
  target: 'es2020',
  dts: true,
  outDir: 'dist',
  clean: true
}
