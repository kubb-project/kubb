import path from 'node:path'

import { mockedPluginManager } from '@kubb/core/mocks'
import { print } from '@kubb/parser'
import { OasManager } from '@kubb/swagger'

import { format } from '../mocks/format.ts'
import { TypeGenerator } from './TypeGenerator.ts'

import type { Plugin, PluginManager } from '@kubb/core'
import type { Oas, OasTypes } from '@kubb/swagger/oas'
import type { PluginOptions } from './types.ts'

describe('TypeGenerator petStore', async () => {
  const petStorePath = path.resolve(__dirname, '../mocks/petStore.yaml')
  const oas = await new OasManager().parse(petStorePath)

  test('generate type for Pet with optionalType `questionToken`', async () => {
    const generator = new TypeGenerator({
      usedEnumNames: {},
      enumType: 'asConst',
      enumSuffix: 'enum',
      dateType: 'string',
      optionalType: 'questionToken',
      transformers: {},
      oasType: false,
      unknownType: 'any',
    }, {
      oas,
      pluginManager: mockedPluginManager,
      plugin: {} as Plugin<PluginOptions>,
    })

    const schemas = oas.getDefinition().components?.schemas
    const node = generator.build({ schema: schemas?.Pet as OasTypes.SchemaObject, baseName: 'Pet' })

    expect(node).toMatchSnapshot()
  })

  test('generate type for Pet with optionalType `undefined`', async () => {
    const generator = new TypeGenerator({
      usedEnumNames: {},
      enumType: 'asConst',
      enumSuffix: '',
      dateType: 'string',
      optionalType: 'undefined',
      transformers: {},
      oasType: false,
      unknownType: 'any',
    }, {
      oas,
      pluginManager: mockedPluginManager,
      plugin: {} as Plugin<PluginOptions>,
    })

    const schemas = oas.getDefinition().components?.schemas
    const node = generator.build({ schema: schemas?.Pet as OasTypes.SchemaObject, baseName: 'Pet' })

    expect(node).toMatchSnapshot()
  })

  test('generate type for Pet with optionalType `questionTokenAndUndefined`', async () => {
    const generator = new TypeGenerator({
      usedEnumNames: {},
      enumType: 'asConst',
      enumSuffix: '',
      dateType: 'string',
      optionalType: 'questionTokenAndUndefined',
      transformers: {},
      oasType: false,
      unknownType: 'any',
    }, {
      oas,
      pluginManager: mockedPluginManager,
      plugin: {} as Plugin<PluginOptions>,
    })

    const schemas = oas.getDefinition().components?.schemas
    const node = generator.build({ schema: schemas?.Pet as OasTypes.SchemaObject, baseName: 'Pet' })

    expect(node).toMatchSnapshot()
  })

  test('generate type for nullable fields', async () => {
    const generator = new TypeGenerator({
      usedEnumNames: {},
      enumType: 'asConst',
      enumSuffix: '',
      dateType: 'string',
      optionalType: 'questionToken',
      transformers: {},
      oasType: false,
      unknownType: 'any',
    }, {
      oas: {} as Oas,
      pluginManager: { resolveName: ({ name }) => name, resolvePath: ({ baseName }) => baseName } as PluginManager,
      plugin: {} as Plugin<PluginOptions>,
    })

    const schema: OasTypes.SchemaObject = {
      type: 'object',
      properties: {
        foo: {
          type: 'string',
          nullable: true,
        },
      },
    }

    const node = generator.build({ schema, baseName: 'Test' })

    expect(node).toMatchSnapshot()
  })

  test('generate type for Pets', async () => {
    const generator = new TypeGenerator({
      usedEnumNames: {},
      enumType: 'asConst',
      enumSuffix: '',
      dateType: 'string',
      optionalType: 'questionToken',
      transformers: {},
      oasType: false,
      unknownType: 'any',
    }, {
      oas,
      pluginManager: mockedPluginManager,
      plugin: {} as Plugin<PluginOptions>,
    })

    const schemas = oas.getDefinition().components?.schemas
    const node = generator.build({ schema: schemas?.Pets as OasTypes.SchemaObject, baseName: 'Pets' })

    expect(node).toMatchSnapshot()
  })
})

describe('TypeGenerator petStoreRef', async () => {
  const petStoreRefPath = path.resolve(__dirname, '../mocks/petStoreRef.yaml')
  const oas = await new OasManager().parse(petStoreRefPath)

  test('generate type for Pets', async () => {
    const generator = new TypeGenerator({
      usedEnumNames: {},
      enumType: 'asConst',
      enumSuffix: '',
      dateType: 'string',
      optionalType: 'questionToken',
      transformers: {},
      oasType: false,
      unknownType: 'any',
    }, {
      oas,
      pluginManager: mockedPluginManager,
      plugin: {} as Plugin<PluginOptions>,
    })

    const schemas = oas.getDefinition().components?.schemas
    const node = generator.build({ schema: schemas?.Pets as OasTypes.SchemaObject, baseName: 'Pets' })

    expect(node).toMatchSnapshot()
  })
})

describe('TypeGenerator discriminator', async () => {
  const discriminatorPath = path.resolve(__dirname, '../mocks/discriminator.yaml')
  const oas = await new OasManager().parse(discriminatorPath)

  test('PetStore defined as array with type union', async () => {
    const generator = new TypeGenerator({
      usedEnumNames: {},
      enumType: 'asConst',
      enumSuffix: '',
      dateType: 'string',
      optionalType: 'questionToken',
      transformers: {},
      oasType: false,
      unknownType: 'any',
    }, {
      oas,
      pluginManager: mockedPluginManager,
      plugin: {} as Plugin<PluginOptions>,
    })

    const schemas = oas.getDefinition().components?.schemas
    const node = generator.build({ schema: schemas?.Petstore as OasTypes.SchemaObject, baseName: 'Petstore' })

    expect(node).toMatchSnapshot()
  })

  test('Cat.type defined as const', async () => {
    const generator = new TypeGenerator({
      usedEnumNames: {},
      enumType: 'asConst',
      enumSuffix: '',
      dateType: 'string',
      optionalType: 'questionToken',
      transformers: {},
      oasType: false,
      unknownType: 'any',
    }, {
      oas,
      pluginManager: mockedPluginManager,
      plugin: {} as Plugin<PluginOptions>,
    })

    const schemas = oas.getDefinition().components?.schemas
    const node = generator.build({ schema: schemas?.Cat as OasTypes.SchemaObject, baseName: 'Cat' })

    expect(node).toMatchSnapshot()
  })

  test('Dog.type defined as const', async () => {
    const generator = new TypeGenerator({
      usedEnumNames: {},
      enumType: 'asConst',
      enumSuffix: '',
      dateType: 'string',
      optionalType: 'questionToken',
      transformers: {},
      oasType: false,
      unknownType: 'any',
    }, {
      oas,
      pluginManager: mockedPluginManager,
      plugin: {} as Plugin<PluginOptions>,
    })

    const schemas = oas.getDefinition().components?.schemas
    const node = generator.build({ schema: schemas?.Dog as OasTypes.SchemaObject, baseName: 'Dog' })

    expect(node).toMatchSnapshot()
  })

  test('NullConst correctly produces "null"', async () => {
    const generator = new TypeGenerator({
      usedEnumNames: {},
      enumType: 'asConst',
      enumSuffix: '',
      dateType: 'string',
      optionalType: 'questionToken',
      transformers: {},
      oasType: false,
      unknownType: 'any',
    }, {
      oas,
      pluginManager: mockedPluginManager,
      plugin: {} as Plugin<PluginOptions>,
    })
    const schemas = oas.getDefinition().components?.schemas
    const node = generator.build({ schema: schemas?.NullConst as OasTypes.SchemaObject, baseName: 'NullConst' })

    expect(node).toMatchSnapshot()
  })

  test('StringValueConst const correctly produces "foobar"', async () => {
    const generator = new TypeGenerator({
      usedEnumNames: {},
      enumType: 'asConst',
      enumSuffix: '',
      dateType: 'string',
      optionalType: 'questionToken',
      transformers: {},
      oasType: false,
      unknownType: 'any',
    }, {
      oas,
      pluginManager: mockedPluginManager,
      plugin: {} as Plugin<PluginOptions>,
    })

    const schemas = oas.getDefinition().components?.schemas
    const node = generator.build({ schema: schemas?.StringValueConst as OasTypes.SchemaObject, baseName: 'StringValueConst' })

    expect(node).toMatchSnapshot()
  })

  test('NumberValueConst const correctly produces `42`', async () => {
    const generator = new TypeGenerator({
      usedEnumNames: {},
      enumType: 'asConst',
      enumSuffix: '',
      dateType: 'string',
      optionalType: 'questionToken',
      transformers: {},
      oasType: false,
      unknownType: 'any',
    }, {
      oas,
      pluginManager: mockedPluginManager,
      plugin: {} as Plugin<PluginOptions>,
    })

    const schemas = oas.getDefinition().components?.schemas
    const node = generator.build({ schema: schemas?.NumberValueConst as OasTypes.SchemaObject, baseName: 'NumberValueConst' })

    expect(node).toMatchSnapshot()
  })

  test('MixedValueTypeConst ignores type constraint in favor of const constraint', async () => {
    const generator = new TypeGenerator({
      usedEnumNames: {},
      enumType: 'asConst',
      enumSuffix: '',
      dateType: 'string',
      optionalType: 'questionToken',
      transformers: {},
      oasType: false,
      unknownType: 'any',
    }, {
      oas,
      pluginManager: mockedPluginManager,
      plugin: {} as Plugin<PluginOptions>,
    })

    const schemas = oas.getDefinition().components?.schemas
    const node = generator.build({ schema: schemas?.MixedValueTypeConst as OasTypes.SchemaObject, baseName: 'MixedValueTypeConst' })

    expect(node).toMatchSnapshot()
  })
})

describe('TypeGenerator enums', async () => {
  const schemaPath = path.resolve(__dirname, '../mocks/enums.yaml')
  const oas = await new OasManager().parse(schemaPath)
  const defaultGenerator = new TypeGenerator({
    usedEnumNames: {},
    enumType: 'asConst',
    enumSuffix: '',
    dateType: 'string',
    optionalType: 'questionToken',
    transformers: {},
    oasType: false,
    unknownType: 'any',
  }, {
    oas,
    pluginManager: mockedPluginManager,
    plugin: {} as Plugin<PluginOptions>,
  })

  const schemas = oas.getDefinition().components?.schemas

  test('generate x-enum-varnames types', async () => {
    const node = defaultGenerator.build({ schema: schemas?.['enumVarNames.Type'] as OasTypes.SchemaObject, baseName: 'enumVarNames' })

    expect(node).toMatchSnapshot()
  })

  test('generate x-enumNames types', async () => {
    const node = defaultGenerator.build({ schema: schemas?.['enumNames.Type'] as OasTypes.SchemaObject, baseName: 'enumNames' })

    expect(node).toMatchSnapshot()
  })

  test('generate with enumtype enum', async () => {
    const generator = new TypeGenerator({
      usedEnumNames: {},
      enumType: 'enum',
      enumSuffix: '',
      dateType: 'string',
      optionalType: 'questionToken',
      transformers: {},
      oasType: false,
      unknownType: 'any',
    }, {
      oas,
      pluginManager: mockedPluginManager,
      plugin: {} as Plugin<PluginOptions>,
    })

    const node = generator.build({ schema: schemas?.['enumNames.Type'] as OasTypes.SchemaObject, baseName: 'enumNames' })

    expect(node).toMatchSnapshot()
  })

  test('generate with enumtype asPascalConst', async () => {
    const generator = new TypeGenerator({
      usedEnumNames: {},
      enumType: 'asPascalConst',
      enumSuffix: '',
      dateType: 'string',
      optionalType: 'questionToken',
      transformers: {},
      oasType: false,
      unknownType: 'any',
    }, {
      oas,
      pluginManager: mockedPluginManager,
      plugin: {} as Plugin<PluginOptions>,
    })

    const node = generator.build({ schema: schemas?.['enumNames.Type'] as OasTypes.SchemaObject, baseName: 'enumNames' })

    expect(node).toMatchSnapshot()
  })

  test('generate with enumtype constEnum', async () => {
    const generator = new TypeGenerator({
      usedEnumNames: {},
      enumType: 'constEnum',
      enumSuffix: '',
      dateType: 'string',
      optionalType: 'questionToken',
      transformers: {},
      oasType: false,
      unknownType: 'any',
    }, {
      oas,
      pluginManager: mockedPluginManager,
      plugin: {} as Plugin<PluginOptions>,
    })

    const node = generator.build({ schema: schemas?.['enumNames.Type'] as OasTypes.SchemaObject, baseName: 'enumNames' })

    expect(node).toMatchSnapshot()
  })

  test('generate with enumtype literal', async () => {
    const generator = new TypeGenerator({
      usedEnumNames: {},
      enumType: 'literal',
      enumSuffix: '',
      dateType: 'string',
      optionalType: 'questionToken',
      transformers: {},
      oasType: false,
      unknownType: 'any',
    }, {
      oas,
      pluginManager: mockedPluginManager,
      plugin: {} as Plugin<PluginOptions>,
    })

    const node = generator.build({ schema: schemas?.['enumNames.Type'] as OasTypes.SchemaObject, baseName: 'enumNames' })

    expect(node).toMatchSnapshot()
  })
})
