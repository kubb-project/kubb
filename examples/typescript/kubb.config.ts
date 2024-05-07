import { defineConfig } from '@kubb/core'
import { pluginSwagger } from '@kubb/swagger'
import { pluginTs } from '@kubb/swagger-ts'

export default defineConfig({
  root: '.',
  input: {
    path: './petStore.yaml',
  },
  output: {
    path: './src/gen',
    clean: true,
  },
  plugins: [
    pluginSwagger({ validate: false }),
    pluginTs({
      output: {
        path: 'models.ts',
        exportAs: 'models',
      },
      enumType: 'enum',
    }),
    pluginTs({
      output: {
        path: 'modelsConst.ts',
        exportAs: 'modelsAsConst',
      },
      enumType: 'asConst',
    }),
    pluginTs({
      output: {
        path: 'modelsPascalConst.ts',
        exportAs: 'modelsPascalConst',
      },
      enumType: 'asPascalConst',
    }),
    pluginTs({
      output: {
        path: 'modelsConstEnum.ts',
        exportAs: 'modelsConstEnum',
      },
      enumType: 'constEnum',
    }),
    pluginTs({
      output: {
        path: 'modelsLiteral.ts',
        exportAs: 'modelsLiteral',
      },
      enumType: 'literal',
    }),
    pluginTs({
      output: {
        path: 'ts/models',
        exportType: 'barrelNamed',
      },
      oasType: 'infer',
    }),
  ],
})
