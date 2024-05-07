import {petStore} from "./petStore"
import sdk from '@stackblitz/sdk';

type Props = {
  config?: string
}

export function ExampleLink({config}: Props){
  const openExample=()=>{
    sdk.openProject(
      {
        files: {
          'package.json': JSON.stringify({
            "scripts": {
              "dev": "kubb generate"
            },
            dependencies: {
              '@kubb/cli': 'latest',
              '@kubb/core': 'latest',
              '@kubb/swagger': 'latest',
            },
          }, undefined,2),
          'petStore.json': JSON.stringify(petStore, undefined,2),
          'kubb.config.ts': `import { defineConfig } from '@kubb/core'
import { pluginSwagger } from '@kubb/swagger'

export default defineConfig(${config})`,
        },
        template: 'node',
        title: `Kubb.config.ts example`,
      },
      // Options
      {
        showSidebar: true,
        hideDevTools: true,
        view: "editor",
        sidebarView: "project",
        openFile:['petStore.json,kubb.config.ts'],
      }
    );
  }

  return (
    <a href="" onClick={openExample}>Run example</a>
  )
}
