import { useMutation } from '@tanstack/react-query'

import client from '../../../client'

import type { UseMutationOptions } from '@tanstack/react-query'
import type { DeleteOrderRequest, DeleteOrderResponse, DeleteOrderPathParams } from '../../models/ts/DeleteOrder'

/**
 * @description For valid response try integer IDs with value < 1000. Anything above 1000 or nonintegers will generate API errors
 * @summary Delete purchase order by ID
 * @link /store/order/{orderId}
 * @deprecated
 */
export function useDeleteOrder<TData = DeleteOrderResponse, TVariables = DeleteOrderRequest>(
  orderId: DeleteOrderPathParams['orderId'],
  options?: {
    mutation?: UseMutationOptions<TData, unknown, TVariables>
  }
) {
  const { mutation: mutationOptions } = options ?? {}

  return useMutation<TData, unknown, TVariables>({
    mutationFn: () => {
      return client<TData, TVariables>({
        method: 'delete',
        url: `/store/order/${orderId}`,
      })
    },
    ...mutationOptions,
  })
}
