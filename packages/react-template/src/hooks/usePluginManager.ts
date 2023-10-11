import { useApp } from './useApp'

import type { AppMeta, PluginManager } from '@kubb/core'

export function usePluginManager(): PluginManager {
  const app = useApp<AppMeta>()

  return app.meta.pluginManager
}