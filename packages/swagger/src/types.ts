import type { PluginFactoryOptions, KubbConfig } from '@kubb/core'

import type Oas from 'oas'
import type { OasOptions } from './parsers/oasParser'

export type Api = {
  getOas: (config: KubbConfig, options?: OasOptions) => Promise<Oas>
}

export type Options = {
  /**
   * Validate your input(see kubb.config) based on @apidevtools/swagger-parser
   * @default true
   */
  validate?: boolean
  /**
   * Relative path to save the JSON models.
   * False will not generate the schema JSON's.
   * @default 'schemas'
   */
  output?: string | false
}

export type PluginOptions = PluginFactoryOptions<Options, false, Api>

export type { default as Oas } from 'oas'

export type { OpenAPIV3 } from 'openapi-types'
