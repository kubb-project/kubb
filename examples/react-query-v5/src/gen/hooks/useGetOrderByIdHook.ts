import client from '@kubb/swagger-client/client'
import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import type { KubbQueryFactory } from './types'
import type { GetOrderByIdQueryResponse, GetOrderByIdPathParams, GetOrderById400, GetOrderById404 } from '../models/GetOrderById'
import type { QueryObserverOptions, UseQueryResult, QueryKey, UseInfiniteQueryOptions, UseInfiniteQueryResult } from '@tanstack/react-query'

type GetOrderById = KubbQueryFactory<
  GetOrderByIdQueryResponse,
  GetOrderById400 | GetOrderById404,
  never,
  GetOrderByIdPathParams,
  never,
  never,
  GetOrderByIdQueryResponse,
  {
    dataReturnType: 'data'
    type: 'query'
  }
>
export const getOrderByIdQueryKey = (orderId: GetOrderByIdPathParams['orderId']) => [{ url: `/store/order/${orderId}`, params: { orderId: orderId } }] as const
export type GetOrderByIdQueryKey = ReturnType<typeof getOrderByIdQueryKey>
export function getOrderByIdQueryOptions<
  TQueryFnData extends GetOrderById['data'] = GetOrderById['data'],
  TError = GetOrderById['error'],
  TData = GetOrderById['response'],
  TQueryData = GetOrderById['response'],
>(
  orderId: GetOrderByIdPathParams['orderId'],
  options: GetOrderById['client']['paramaters'] = {},
): QueryObserverOptions<GetOrderById['unionResponse'], TError, TData, TQueryData, GetOrderByIdQueryKey> {
  const queryKey = getOrderByIdQueryKey(orderId)
  return {
    queryKey,
    queryFn: () => {
      return client<TQueryFnData, TError>({
        method: 'get',
        url: `/store/order/${orderId}`,
        ...options,
      }).then(res => res?.data || res)
    },
  }
} /**
 * @description For valid response try integer IDs with value <= 5 or > 10. Other values will generate exceptions.
 * @summary Find purchase order by ID
 * @link /store/order/:orderId
 */

export function useGetOrderByIdHook<
  TQueryFnData extends GetOrderById['data'] = GetOrderById['data'],
  TError = GetOrderById['error'],
  TData = GetOrderById['response'],
  TQueryData = GetOrderById['response'],
  TQueryKey extends QueryKey = GetOrderByIdQueryKey,
>(orderId: GetOrderByIdPathParams['orderId'], options: {
  query?: QueryObserverOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey>
  client?: GetOrderById['client']['paramaters']
} = {}): UseQueryResult<TData, TError> & {
  queryKey: TQueryKey
} {
  const { query: queryOptions, client: clientOptions = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getOrderByIdQueryKey(orderId)
  const query = useQuery<any, TError, TData, any>({
    ...getOrderByIdQueryOptions<TQueryFnData, TError, TData, TQueryData>(orderId, clientOptions),
    queryKey,
    ...queryOptions,
  }) as UseQueryResult<TData, TError> & {
    queryKey: TQueryKey
  }
  query.queryKey = queryKey as TQueryKey
  return query
}

type GetOrderByIdInfinite = KubbQueryFactory<
  GetOrderByIdQueryResponse,
  GetOrderById400 | GetOrderById404,
  never,
  GetOrderByIdPathParams,
  never,
  never,
  GetOrderByIdQueryResponse,
  {
    dataReturnType: 'data'
    type: 'query'
  }
>
export const getOrderByIdInfiniteQueryKey = (orderId: GetOrderByIdPathParams['orderId']) =>
  [{ url: `/store/order/${orderId}`, params: { orderId: orderId } }] as const
export type GetOrderByIdInfiniteQueryKey = ReturnType<typeof getOrderByIdInfiniteQueryKey>
export function getOrderByIdInfiniteQueryOptions<
  TQueryFnData extends GetOrderByIdInfinite['data'] = GetOrderByIdInfinite['data'],
  TError = GetOrderByIdInfinite['error'],
  TData = GetOrderByIdInfinite['response'],
  TQueryData = GetOrderByIdInfinite['response'],
>(
  orderId: GetOrderByIdPathParams['orderId'],
  options: GetOrderByIdInfinite['client']['paramaters'] = {},
): UseInfiniteQueryOptions<GetOrderByIdInfinite['unionResponse'], TError, TData, TQueryData, GetOrderByIdInfiniteQueryKey> {
  const queryKey = getOrderByIdInfiniteQueryKey(orderId)
  return {
    queryKey,
    queryFn: ({ pageParam }) => {
      return client<TQueryFnData, TError>({
        method: 'get',
        url: `/store/order/${orderId}`,
        ...options,
      }).then(res => res?.data || res)
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage['id'],
  }
} /**
 * @description For valid response try integer IDs with value <= 5 or > 10. Other values will generate exceptions.
 * @summary Find purchase order by ID
 * @link /store/order/:orderId
 */

export function useGetOrderByIdHookInfinite<
  TQueryFnData extends GetOrderByIdInfinite['data'] = GetOrderByIdInfinite['data'],
  TError = GetOrderByIdInfinite['error'],
  TData = GetOrderByIdInfinite['response'],
  TQueryData = GetOrderByIdInfinite['response'],
  TQueryKey extends QueryKey = GetOrderByIdInfiniteQueryKey,
>(orderId: GetOrderByIdPathParams['orderId'], options: {
  query?: UseInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey>
  client?: GetOrderByIdInfinite['client']['paramaters']
} = {}): UseInfiniteQueryResult<TData, TError> & {
  queryKey: TQueryKey
} {
  const { query: queryOptions, client: clientOptions = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getOrderByIdInfiniteQueryKey(orderId)
  const query = useInfiniteQuery<any, TError, TData, any>({
    ...getOrderByIdInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryData>(orderId, clientOptions),
    queryKey,
    ...queryOptions,
  }) as UseInfiniteQueryResult<TData, TError> & {
    queryKey: TQueryKey
  }
  query.queryKey = queryKey as TQueryKey
  return query
}
