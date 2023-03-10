import client from '../../../client'

import type { FindPetsByStatusResponse, FindPetsByStatusQueryParams } from '../../models/ts/FindPetsByStatus'

/**
 * @description Multiple status values can be provided with comma separated strings
 * @summary Finds Pets by status
 * @link /pet/findByStatus
 * @deprecated
 */
export function findPetsByStatus<TData = FindPetsByStatusResponse>(params?: FindPetsByStatusQueryParams) {
  return client<TData>({
    method: 'get',
    url: `/pet/findByStatus`,
    params,
  })
}
