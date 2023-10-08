/* eslint- @typescript-eslint/explicit-module-boundary-types */
import { combineCodes, createFunctionParams } from '@kubb/core'
import { OasBuilder, getComments, getDataParams } from '@kubb/swagger'
import { render } from '@kubb/react-template'

import { URLPath } from '@kubb/core'
import type { Operation, OperationSchemas } from '@kubb/swagger'
import { ClientFunction } from '../components/index.ts'

type Config = {
  operation: Operation
  schemas: OperationSchemas
  name: string
}

type ClientResult = { code: string; name: string }

export class ClientBuilder extends OasBuilder<Config> {
  private get client(): ClientResult {
    const { name, operation, schemas } = this.config
    const codes: string[] = []

    const comments = getComments(operation)
    const method = operation.method

    const generics = [`TData = ${schemas.response.name}`, schemas.request?.name ? `TVariables = ${schemas.request?.name}` : undefined].filter(Boolean)
    const clientGenerics = ['TData', schemas.request?.name ? 'TVariables' : undefined].filter(Boolean)
    const params = createFunctionParams([
      ...getDataParams(schemas.pathParams, { typed: true }),
      {
        name: 'data',
        type: 'TVariables',
        enabled: !!schemas.request?.name,
        required: !!schemas.request?.schema.required?.length,
      },
      {
        name: 'params',
        type: schemas.queryParams?.name,
        enabled: !!schemas.queryParams?.name,
        required: !!schemas.queryParams?.schema.required?.length,
      },
      {
        name: 'headers',
        type: schemas.headerParams?.name,
        enabled: !!schemas.headerParams?.name,
        required: !!schemas.headerParams?.schema.required?.length,
      },
      {
        name: 'options',
        type: `Partial<Parameters<typeof client>[0]>`,
        default: '{}',
      },
    ])

    const Component = () => {
      return (
        <ClientFunction
          name={name}
          generics={generics}
          clientGenerics={clientGenerics}
          params={params}
          returnType={`ResponseConfig<${clientGenerics[0]}>["data"]`}
          method={method}
          url={new URLPath(operation.path).template}
          withParams={!!schemas.queryParams?.name}
          withData={!!schemas.request?.name}
          withHeaders={!!schemas.headerParams?.name}
          comments={comments}
        />
      )
    }

    codes.push(render(<Component />).output)

    return { code: combineCodes(codes), name }
  }

  configure(config: Config): this {
    this.config = config

    return this
  }

  print(): string {
    return this.client.code
  }
}