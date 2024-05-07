import {
  SandpackProvider,
  SandpackLayout,
  SandpackConsole,
  useActiveCode, useSandpack, FileTabs, SandpackStack, Sandpack,
} from "@codesandbox/sandpack-react";
import Editor from "@monaco-editor/react";

import {petStore} from "./petStore"

function MonacoEditor() {
  const { code, updateCode } = useActiveCode();
  const { sandpack } = useSandpack();

  return (
    <SandpackStack style={{ margin: 0 }}>
      <FileTabs />
      <div style={{ flex: 1, paddingTop: 8, background: "#1e1e1e" }}>
        <Editor
          width="100%"
          height="100%"
          language="javascript"
          theme="vs-dark"
          key={sandpack.activeFile}
          defaultValue={code}
          onChange={(value) => updateCode(value || "")}
        />
      </div>
    </SandpackStack>
  );
}


type Props = {
  config?: string
}

export function Example({config}: Props){
  return (
    <>
      <Sandpack
        template="node"
        options={{
          layout: "console",
          // visibleFiles: ["kubb.config.ts", "index.ts", 'test.ts'],
          // activeFile: "kubb.config.ts",
        }}
        customSetup={{
          dependencies: {
            "@kubb/core": "latest",
            "@kubb/swagger": "latest",
            "@kubb/swagger-ts": "latest",
            "swagger2openapi": "latest",
            "oas-normalize": "latest"
          },
          environment: "node"
        }}
        files={ {
          'petStore.json': JSON.stringify(petStore, undefined,2),
          'kubb.config.ts': `import { defineConfig } from '@kubb/core'
import { pluginSwagger } from '@kubb/swagger'

export default defineConfig(${config})`,
          'index.js':`import { build } from '@kubb/core'
const data = await fetch("https://play.kubb.dev/api/parse", {
    "body": "{\\"version\\":\\"2.17.0\\",\\"tanstackVersion\\":\\"4\\",\\"mswVersion\\":\\"1\\",\\"config\\":{\\"root\\":\\".\\",\\"input\\":{\\"data\\":\\"openapi: 3.0.0\\\\ninfo:\\\\n  version: 1.0.0\\\\n  title: Swagger Petstore\\\\n  license:\\\\n    name: MIT\\\\nservers:\\\\n  - url: http://petstore.swagger.io/v1\\\\npaths:\\\\n  /pets:\\\\n    get:\\\\n      summary: List all pets\\\\n      operationId: listPets\\\\n      tags:\\\\n        - pets\\\\n      parameters:\\\\n        - name: limit\\\\n          in: query\\\\n          description: How many items to return at one time (max 100)\\\\n          required: false\\\\n          schema:\\\\n            type: string\\\\n      responses:\\\\n        '200':\\\\n          description: A paged array of pets\\\\n          headers:\\\\n            x-next:\\\\n              description: A link to the next page of responses\\\\n              schema:\\\\n                type: string\\\\n          content:\\\\n            application/json:\\\\n              schema:\\\\n                $ref: '#/components/schemas/Pets'\\\\n        default:\\\\n          description: unexpected error\\\\n          content:\\\\n            application/json:\\\\n              schema:\\\\n                $ref: '#/components/schemas/Error'\\\\n    post:\\\\n      summary: Create a pet\\\\n      operationId: createPets\\\\n      tags:\\\\n        - pets\\\\n      requestBody:\\\\n        required: true\\\\n        content:\\\\n          application/json:\\\\n            schema:\\\\n              type: object\\\\n              required:\\\\n                - 'name'\\\\n                - 'tag'\\\\n              properties:\\\\n                name:\\\\n                  type: string\\\\n                tag:\\\\n                  type: string\\\\n      responses:\\\\n        '201':\\\\n          description: Null response\\\\n          content:\\\\n            application/json:\\\\n              schema:\\\\n                allOf:\\\\n                  - $ref: '#/components/schemas/Error'\\\\n                  - type: object\\\\n                    required:\\\\n                        - code\\\\n                    properties:\\\\n                        name:\\\\n                            $ref: \\\\\\"#/components/schemas/ErrorCode\\\\\\"\\\\n        default:\\\\n          description: unexpected error\\\\n          content:\\\\n            application/json:\\\\n              schema:\\\\n                $ref: '#/components/schemas/Error'\\\\n\\\\n  /pets/{petId}:\\\\n    parameters:\\\\n    - name: petId\\\\n      in: path\\\\n      required: true\\\\n      description: The id of the pet to retrieve\\\\n      schema:\\\\n        type: string\\\\n    get:\\\\n      summary: Info for a specific pet\\\\n      operationId: showPetById\\\\n      tags:\\\\n        - pets\\\\n      parameters:\\\\n        - name: testId\\\\n          in: path\\\\n          required: true\\\\n          description: The id of the pet to retrieve\\\\n          schema:\\\\n            type: string\\\\n      responses:\\\\n        '200':\\\\n          description: Expected response to a valid request\\\\n          content:\\\\n            application/json:\\\\n              schema:\\\\n                $ref: '#/components/schemas/Pet'\\\\n        default:\\\\n          description: unexpected error\\\\n          content:\\\\n            application/json:\\\\n              schema:\\\\n                $ref: '#/components/schemas/Error'\\\\ncomponents:\\\\n  schemas:\\\\n    Pet:\\\\n      type: object\\\\n      required:\\\\n        - id\\\\n        - name\\\\n      properties:\\\\n        id:\\\\n          type: integer\\\\n          format: int64\\\\n        name:\\\\n          type: string\\\\n        tag:\\\\n          type: string\\\\n        category:\\\\n          $ref: 'https://petstore3.swagger.io/api/v3/openapi.json#/components/schemas/Category'\\\\n    Pets:\\\\n      type: array\\\\n      items: {\\\\n        type: 'object',\\\\n        required: ['id', 'name'],\\\\n        properties: { id: { type: 'integer', format: 'int64' }, name: { type: 'string' }, tag: { type: 'string' } },\\\\n      }\\\\n    Error:\\\\n      type: object\\\\n      required:\\\\n        - code\\\\n        - message\\\\n      properties:\\\\n        code:\\\\n          type: integer\\\\n          format: int32\\\\n        message:\\\\n          type: string\\\\n    ErrorCode:\\\\n      type: object\\\\n      required:\\\\n        - id\\\\n        - name\\\\n      properties:\\\\n        id:\\\\n          type: integer\\\\n          format: int32\\\\n        name:\\\\n          type: string\\\\n\\"},\\"output\\":{\\"path\\":\\"gen\\"},\\"plugins\\":[[\\"@kubb/swagger\\",{}],[\\"@kubb/swagger-ts\\",{\\"output\\":{\\"path\\":\\"models.ts\\"}}],[\\"@kubb/swagger-zod\\",{\\"output\\":{\\"path\\":\\"zod\\"}}],[\\"@kubb/swagger-tanstack-query\\",{\\"output\\":{\\"path\\":\\"hooks\\"},\\"framework\\":\\"react\\"}]]}}",
    "method": "POST"
});
console.log(await data.json())
//import { pluginTs } from '@kubb/swagger-ts'`}}

      />
{/*    <SandpackProvider*/}
{/*      theme={document.querySelector(":root").classList.contains('dark')? "dark": "light"}*/}
{/*      template="node"*/}
{/*      customSetup={{*/}
{/*        dependencies: {*/}
{/*          "@kubb/core": "latest",*/}
{/*          "@kubb/swagger": "latest"*/}
{/*        },*/}
{/*      }}*/}
{/*      options={{*/}
{/*        visibleFiles: ["kubb.config.ts", "index.js"],*/}
{/*        activeFile: "kubb.config.ts",*/}
{/*      }}*/}
{/*      files={{*/}
{/*        'kubb.config.ts': JSON.stringify(config, undefined,2),*/}
{/*        'index.js':`*/}
{/*import { write } from '@kubb/core/fs'*/}
{/*import { build } from '@kubb/core'*/}

{/*const { error, files, pluginManager } = await build({*/}
{/*  config: {*/}
{/*    root: '.',*/}
{/*    input: {*/}
{/*      data: '',*/}
{/*    },*/}
{/*    output: {*/}
{/*      path: './gen',*/}
{/*    },*/}
{/*  },*/}
{/*})*/}

{/*console.log(files)*/}
{/*        `*/}
{/*      }}*/}
{/*    >*/}
{/*      <SandpackLayout>*/}
{/*        <MonacoEditor />*/}
{/*        <SandpackConsole showSyntaxError showHeader showResetConsoleButton />*/}
{/*      </SandpackLayout>*/}
{/*    </SandpackProvider>*/}
      </>
  )
}
