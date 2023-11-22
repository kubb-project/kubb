import type { KubbPlugin, PluginFactoryOptions, ResolveNameParams } from '@kubb/core'
import type { Exclude, Include, Override, ResolvePathOptions } from '@kubb/swagger'

export type Options = {
  /**
   * Relative path to save the TypeScript types.
   * When output is a file it will save all models inside that file else it will create a file per schema item.
   * @default 'types'
   */
  output?: string
  /**
   * Group the TypeScript types based on the provided name.
   */
  group?: {
    /**
     * Tag will group based on the operation tag inside the Swagger file.
     */
    type: 'tag'
    /**
     * Relative path to save the grouped TypeScript Types.
     *
     * `{{tag}}` will be replaced by the current tagName.
     * @example `${output}/{{tag}}Controller` => `models/PetController`
     * @default `${output}/{{tag}}Controller`
     */
    output?: string
  }
  /**
   * Name to be used for the `export * as {{exportAs}} from './`
   */
  exportAs?: string
  /**
   * Array containing exclude paramaters to exclude/skip tags/operations/methods/paths.
   */
  exclude?: Array<Exclude>
  /**
   * Array containing include paramaters to include tags/operations/methods/paths.
   */
  include?: Array<Include>
  /**
   * Array containing override paramaters to override `options` based on tags/operations/methods/paths.
   */
  override?: Array<Override<Options>>
  /**
   * Choose to use `enum` or `as const` for enums
   * @default 'asConst'
   */
  enumType?: 'enum' | 'asConst' | 'asPascalConst'
  /**
   * Choose to use `date` or `datetime` as JavaScript `Date` instead of `string`.
   * @default 'string'
   */
  dateType?: 'string' | 'date'
  /**
   * Choose what to use as mode for an optional value.
   * @examples 'questionToken': type?: string
   * @examples 'undefined': type: string | undefined
   * @examples 'questionTokenAndUndefined': type?: string | undefined
   * @default 'questionToken'
   */
  optionalType?: 'questionToken' | 'undefined' | 'questionTokenAndUndefined'
  transformers?: {
    /**
     * Customize the names based on the type that is provided by the plugin.
     */
    name?: (name: ResolveNameParams['name'], type?: ResolveNameParams['type']) => string
  }
}

export type FileMeta = {
  pluginKey?: KubbPlugin['key']
  name?: string
  tag?: string
}

export type PluginOptions = PluginFactoryOptions<'swagger-ts', Options, Options, never, ResolvePathOptions>

declare module '@kubb/core' {
  export interface _Register {
    ['@kubb/swagger-ts']: PluginOptions
  }
}
