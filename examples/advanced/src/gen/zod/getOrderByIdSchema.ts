import z from 'zod'

import { orderSchema } from './orderSchema'

export const getOrderByIdPathParamsSchema = z.object({ orderId: z.number() })
export const getOrderByIdQueryParamsSchema = z.object({})

/**
 * @description successful operation
 */
export const getOrderByIdResponseSchema = z.lazy(() => orderSchema)
