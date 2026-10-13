import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

export default [
  { ignores: ['.next/**', 'out/**', '.wrangler/**', 'node_modules/**', 'next-env.d.ts', 'css.d.ts'] },
  ...nextCoreWebVitals,
  ...nextTypescript,
];
