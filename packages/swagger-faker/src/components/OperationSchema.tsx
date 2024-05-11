import { Oas } from '@kubb/plugin-oas/components'
import { useOas, useOperation, useOperationManager } from '@kubb/plugin-oas/hooks'
import { File, Parser, useApp } from '@kubb/react'
import { pluginTsName } from '@kubb/swagger-ts'

import { SchemaGenerator } from '../SchemaGenerator.tsx'

import type { OperationSchema as OperationSchemaType } from '@kubb/plugin-oas'
import type { ReactNode } from 'react'
import type { FileMeta, PluginFaker } from '../types.ts'

type Props = {}

export function OperationSchema({}: Props): ReactNode {
  return <></>
}

type FileProps = {}

OperationSchema.File = function ({}: FileProps): ReactNode {
  const { plugin, pluginManager, mode } = useApp<PluginFaker>()

  const oas = useOas()
  const { getSchemas, getFile } = useOperationManager()
  const operation = useOperation()

  const file = getFile(operation)
  const schemas = getSchemas(operation)
  const generator = new SchemaGenerator(plugin.options, {
    oas,
    plugin,
    pluginManager,
    mode,
    override: plugin.options.override,
  })

  const items = [schemas.pathParams, schemas.queryParams, schemas.headerParams, schemas.statusCodes, schemas.request, schemas.response].flat().filter(Boolean)

  const mapItem = ({ name, schema, ...options }: OperationSchemaType, i: number) => {
    // used for this.options.typed
    const typeName = pluginManager.resolveName({
      name,
      pluginKey: [pluginTsName],
      type: 'type',
    })
    const typeFileName = pluginManager.resolveName({
      name: name,
      pluginKey: [pluginTsName],
      type: 'file',
    })
    const typePath = pluginManager.resolvePath({
      baseName: options.operationName || typeFileName,
      pluginKey: [pluginTsName],
      options: { tag: options.operation?.getTags()[0]?.name },
    })

    const tree = generator.parse({ schema, name })
    const source = generator.getSource(name, tree, { ...options, withData: false })

    return (
      <Oas.Schema key={i} name={name} value={schema} tree={tree}>
        {typeName && typePath && <File.Import isTypeOnly root={file.path} path={typePath} name={[typeName]} />}

        {mode === 'split' && <Oas.Schema.Imports />}
        <File.Source>{source.join('\n')}</File.Source>
      </Oas.Schema>
    )
  }

  return (
    <Parser language="typescript">
      <File<FileMeta> baseName={file.baseName} path={file.path} meta={file.meta}>
        <File.Import name={['faker']} path="@faker-js/faker" />
        {items.map(mapItem)}
      </File>
    </Parser>
  )
}
