import path from 'node:path'

import { createPlugin, FileManager, PluginManager } from '@kubb/core'
import { camelCase } from '@kubb/core/transformers'
import { renderTemplate } from '@kubb/core/utils'
import { pluginName as swaggerPluginName } from '@kubb/swagger'
import { getGroupedByTagFiles } from '@kubb/swagger/utils'
import { pluginName as swaggerTypeScriptPluginName } from '@kubb/swagger-ts'

import { FakerBuilder } from './FakerBuilder.ts'
import { OperationGenerator } from './OperationGenerator.tsx'

import type { KubbFile, Plugin } from '@kubb/core'
import type { PluginOptions as SwaggerPluginOptions } from '@kubb/swagger'
import type { OasTypes } from '@kubb/swagger/oas'
import type { PluginOptions } from './types.ts'

export const pluginName = 'swagger-faker' satisfies PluginOptions['name']
export const pluginKey: PluginOptions['key'] = [pluginName] satisfies PluginOptions['key']

export const definePlugin = createPlugin<PluginOptions>((options) => {
  const {
    output = { path: 'mocks' },
    seed,
    group,
    exclude = [],
    include,
    override = [],
    transformers = {},
    mapper = {},
    dateType = 'string',
    unknownType = 'any',
  } = options
  const template = group?.output ? group.output : `${output.path}/{{tag}}Controller`

  return {
    name: pluginName,
    options: {
      transformers,
      mapper,
      dateType,
      seed,
      unknownType,
    },
    pre: [swaggerPluginName, swaggerTypeScriptPluginName],
    resolvePath(baseName, pathMode, options) {
      const root = path.resolve(this.config.root, this.config.output.path)
      const mode = pathMode ?? FileManager.getMode(path.resolve(root, output.path))

      if (mode === 'file') {
        /**
         * when output is a file then we will always append to the same file(output file), see fileManager.addOrAppend
         * Other plugins then need to call addOrAppend instead of just add from the fileManager class
         */
        return path.resolve(root, output.path)
      }

      if (options?.tag && group?.type === 'tag') {
        const tag = camelCase(options.tag)

        return path.resolve(root, renderTemplate(template, { tag }), baseName)
      }

      return path.resolve(root, output.path, baseName)
    },
    resolveName(name, type) {
      const resolvedName = camelCase(name, { prefix: type ? 'create' : undefined, isFile: type === 'file' })

      if (type) {
        return transformers?.name?.(resolvedName, type) || resolvedName
      }

      return resolvedName
    },
    async writeFile(source, writePath) {
      if (!writePath.endsWith('.ts') || !source) {
        return
      }

      return this.fileManager.write(source, writePath, { sanity: false })
    },
    async buildStart() {
      const [swaggerPlugin]: [Plugin<SwaggerPluginOptions>] = PluginManager.getDependedPlugins<SwaggerPluginOptions>(this.plugins, [swaggerPluginName])

      const oas = await swaggerPlugin.api.getOas()
      const schemas = await swaggerPlugin.api.getSchemas()
      const root = path.resolve(this.config.root, this.config.output.path)
      const mode = FileManager.getMode(path.resolve(root, output.path))
      const builder = new FakerBuilder(this.plugin.options, { oas, plugin: this.plugin, pluginManager: this.pluginManager })

      builder.add(
        Object.entries(schemas).map(([name, schema]: [string, OasTypes.SchemaObject]) => ({ name, schema })),
      )

      if (mode === 'directory') {
        const mapFolderSchema = async ([name]: [string, OasTypes.SchemaObject]) => {
          const baseName = `${this.resolveName({ name, pluginKey: this.plugin.key, type: 'file' })}.ts` as const
          const resolvedPath = this.resolvePath({ baseName, pluginKey: this.plugin.key })
          const { source, imports } = builder.build(name)

          if (!resolvedPath) {
            return null
          }

          return this.addFile({
            path: resolvedPath,
            baseName,
            source,
            imports: [
              ...imports.map(item => ({ ...item, root: resolvedPath })),
              {
                name: ['faker'],
                path: '@faker-js/faker',
              },
            ],
            meta: {
              pluginKey: this.plugin.key,
            },
          })
        }

        const promises = Object.entries(schemas).map(mapFolderSchema)

        await Promise.all(promises)
      }

      if (mode === 'file') {
        const resolvedPath = this.resolvePath({ baseName: '', pluginKey: this.plugin.key })
        const { source } = builder.build()

        if (!resolvedPath) {
          return
        }

        await this.addFile({
          path: resolvedPath,
          baseName: output.path as KubbFile.BaseName,
          source,
          imports: [
            {
              name: ['faker'],
              path: '@faker-js/faker',
            },
          ],
          meta: {
            pluginKey: this.plugin.key,
          },
        })
      }

      const operationGenerator = new OperationGenerator(
        this.plugin.options,
        {
          oas,
          pluginManager: this.pluginManager,
          plugin: this.plugin,
          contentType: swaggerPlugin.api.contentType,
          exclude,
          include,
          override,
          mode,
        },
      )

      const files = await operationGenerator.build()
      await this.addFile(...files)
    },
    async buildEnd() {
      if (this.config.output.write === false) {
        return
      }

      const root = path.resolve(this.config.root, this.config.output.path)

      if (group?.type === 'tag') {
        const rootFiles = await getGroupedByTagFiles({
          logger: this.logger,
          files: this.fileManager.files,
          plugin: this.plugin,
          template,
          exportAs: group.exportAs || '{{tag}}Mocks',
          root,
          output,
        })

        await this.addFile(...rootFiles)
      }

      await this.fileManager.addIndexes({ root, output, meta: { pluginKey: this.plugin.key } })
    },
  }
})
