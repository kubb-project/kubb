import axios from 'axios'

import type { AxiosError } from 'axios'

export type RequestConfig<TVariables = unknown> = {
  method: 'get' | 'put' | 'patch' | 'post' | 'delete'
  url: string
  params?: unknown
  data?: TVariables
  responseType?: 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream'
  signal?: AbortSignal
}

export const axiosInstance = axios.create({
  baseURL: typeof 'https://petstore3.swagger.io/api/v3' !== 'undefined' ? 'https://petstore3.swagger.io/api/v3' : undefined,
  headers: '{}' ? JSON.parse('{}') : {},
})

export const axiosClient = async <TData, TError = unknown, TVariables = unknown>(config: RequestConfig<TVariables>): Promise<TData> => {
  const promise = axiosInstance
    .request<TData>({ ...config })
    .then(({ data }) => data)
    .catch((e: AxiosError<TError>) => {
      throw e
    })

  return promise
}

export default axiosClient
