import { useQuery, useMutation } from '@tanstack/react-query'

import client from '@kubb/swagger-client/client'

import type { QueryKey, UseQueryResult, UseQueryOptions, QueryOptions, UseMutationOptions } from '@tanstack/react-query'
import type {
  ListPetsResponse,
  ListPetsQueryParams,
  CreatePetsRequest,
  CreatePetsResponse,
  ShowPetByIdResponse,
  ShowPetByIdPathParams,
  ShowPetByIdQueryParams,
} from './models'

export const listPetsQueryKey = (params?: ListPetsQueryParams) => [`/pets`, ...(params ? [params] : [])] as const

export function listPetsQueryOptions<TData = ListPetsResponse>(params?: ListPetsQueryParams): QueryOptions<TData> {
  const queryKey = listPetsQueryKey(params)

  return {
    queryKey,
    queryFn: () => {
      return client<TData>({
        method: 'get',
        url: `/pets`,
        params,
      })
    },
  }
}

/**
 * @summary List all pets
 * @link /pets
 * @deprecated
 */
export function useListPets<TData = ListPetsResponse>(
  params?: ListPetsQueryParams,
  options?: { query?: UseQueryOptions<TData> }
): UseQueryResult<TData> & { queryKey: QueryKey } {
  const { query: queryOptions } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? listPetsQueryKey(params)

  const query = useQuery<TData>({
    ...listPetsQueryOptions<TData>(params),
    ...queryOptions,
  }) as UseQueryResult<TData> & { queryKey: QueryKey }

  query.queryKey = queryKey

  return query
}

/**
 * @summary Create a pet
 * @link /pets
 * @deprecated
 */
export function useCreatePets<TData = CreatePetsResponse, TVariables = CreatePetsRequest>(options?: {
  mutation?: UseMutationOptions<TData, unknown, TVariables>
}) {
  const { mutation: mutationOptions } = options ?? {}

  return useMutation<TData, unknown, TVariables>({
    mutationFn: (data) => {
      return client<TData, TVariables>({
        method: 'post',
        url: `/pets`,
        data,
      })
    },
    ...mutationOptions,
  })
}

export const showPetByIdQueryKey = (petId: ShowPetByIdPathParams['petId'], testId: ShowPetByIdPathParams['testId'], params?: ShowPetByIdQueryParams) =>
  [`/pets/${petId}`, ...(params ? [params] : [])] as const

export function showPetByIdQueryOptions<TData = ShowPetByIdResponse>(
  petId: ShowPetByIdPathParams['petId'],
  testId: ShowPetByIdPathParams['testId'],
  params?: ShowPetByIdQueryParams
): QueryOptions<TData> {
  const queryKey = showPetByIdQueryKey(petId, testId, params)

  return {
    queryKey,
    queryFn: () => {
      return client<TData>({
        method: 'get',
        url: `/pets/${petId}`,
        params,
      })
    },
  }
}

/**
 * @summary Info for a specific pet
 * @link /pets/{petId}
 * @deprecated
 */
export function useShowPetById<TData = ShowPetByIdResponse>(
  petId: ShowPetByIdPathParams['petId'],
  testId: ShowPetByIdPathParams['testId'],
  params?: ShowPetByIdQueryParams,
  options?: { query?: UseQueryOptions<TData> }
): UseQueryResult<TData> & { queryKey: QueryKey } {
  const { query: queryOptions } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? showPetByIdQueryKey(petId, testId, params)

  const query = useQuery<TData>({
    ...showPetByIdQueryOptions<TData>(petId, testId, params),
    ...queryOptions,
  }) as UseQueryResult<TData> & { queryKey: QueryKey }

  query.queryKey = queryKey

  return query
}
