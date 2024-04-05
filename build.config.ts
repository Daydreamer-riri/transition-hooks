import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index.ts',
    'src/hooks/useTransition.ts',
    'src/hooks/useSwitchTransition/index.tsx',
    'src/hooks/useListTransition.tsx',
  ],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
    esbuild: {
      // minify: true,
    },
  },
})
