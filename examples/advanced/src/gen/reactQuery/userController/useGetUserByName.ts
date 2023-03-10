import { useQuery } from '@tanstack/react-query'

import client from '../../../client'

import type { QueryKey, UseQueryResult, UseQueryOptions, QueryOptions } from '@tanstack/react-query'
import type { GetUserByNameResponse, GetUserByNamePathParams, GetUserByNameQueryParams } from '../../models/ts/GetUserByName'

export const getUserByNameQueryKey = (username: GetUserByNamePathParams['username'], params?: GetUserByNameQueryParams) =>
  [`/user/${username}`, ...(params ? [params] : [])] as const

export function getUserByNameQueryOptions<TData = GetUserByNameResponse>(
  username: GetUserByNamePathParams['username'],
  params?: GetUserByNameQueryParams
): QueryOptions<TData> {
  const queryKey = getUserByNameQueryKey(username, params)

  return {
    queryKey,
    queryFn: () => {
      return client<TData>({
        method: 'get',
        url: `/user/${username}`,
        params,
      })
    },
  }
}

/**
 * @summary Get user by user name
 * @link /user/{username}
 * @deprecated
 */
export function useGetUserByName<TData = GetUserByNameResponse>(
  username: GetUserByNamePathParams['username'],
  params?: GetUserByNameQueryParams,
  options?: { query?: UseQueryOptions<TData> }
): UseQueryResult<TData> & { queryKey: QueryKey } {
  const { query: queryOptions } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getUserByNameQueryKey(username, params)

  const query = useQuery<TData>({
    ...getUserByNameQueryOptions<TData>(username, params),
    ...queryOptions,
  }) as UseQueryResult<TData> & { queryKey: QueryKey }

  query.queryKey = queryKey

  return query
}
