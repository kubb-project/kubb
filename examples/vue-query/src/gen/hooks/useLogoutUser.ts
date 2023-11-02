import { useQuery } from '@tanstack/vue-query'
import client from '@kubb/swagger-client/client'
import type { KubbQueryFactory } from './types'
import type { VueQueryObserverOptions } from '@tanstack/vue-query/build/lib/types'
import type { QueryKey, UseQueryReturnType } from '@tanstack/vue-query'
import type { LogoutUserQueryResponse } from '../models/LogoutUser'

type LogoutUser = KubbQueryFactory<
  LogoutUserQueryResponse,
  never,
  never,
  never,
  never,
  never,
  LogoutUserQueryResponse,
  {
    dataReturnType: 'data'
    type: 'query'
  }
>
export const logoutUserQueryKey = () => [{ url: `/user/logout` }] as const
export type LogoutUserQueryKey = ReturnType<typeof logoutUserQueryKey>
export function logoutUserQueryOptions<
  TQueryFnData extends LogoutUser['data'] = LogoutUser['data'],
  TError = LogoutUser['error'],
  TData = LogoutUser['response'],
  TQueryData = LogoutUser['response'],
>(options: LogoutUser['client']['paramaters'] = {}): VueQueryObserverOptions<LogoutUser['unionResponse'], TError, TData, TQueryData, LogoutUserQueryKey> {
  const queryKey = logoutUserQueryKey()
  return {
    queryKey,
    queryFn: () => {
      return client<TQueryFnData, TError>({
        method: 'get',
        url: `/user/logout`,
        ...options,
      }).then((res) => res?.data || res)
    },
  }
}
/**
 * @summary Logs out current logged in user session
 * @link /user/logout
 */
export function useLogoutUser<
  TQueryFnData extends LogoutUser['data'] = LogoutUser['data'],
  TError = LogoutUser['error'],
  TData = LogoutUser['response'],
  TQueryData = LogoutUser['response'],
  TQueryKey extends QueryKey = LogoutUserQueryKey,
>(
  options: {
    query?: VueQueryObserverOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey>
    client?: LogoutUser['client']['paramaters']
  } = {},
): UseQueryReturnType<TData, TError> & {
  queryKey: TQueryKey
} {
  const { query: queryOptions, client: clientOptions = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? logoutUserQueryKey()
  const query = useQuery<TQueryFnData, TError, TData, any>({
    ...logoutUserQueryOptions<TQueryFnData, TError, TData, TQueryData>(clientOptions),
    queryKey,
    ...queryOptions,
  }) as UseQueryReturnType<TData, TError> & {
    queryKey: TQueryKey
  }
  query.queryKey = queryKey as TQueryKey
  return query
}
