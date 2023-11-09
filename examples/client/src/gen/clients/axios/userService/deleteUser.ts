import client from '../../../client'
import type { ResponseConfig } from '../../../client'
import type { DeleteUserMutationResponse, DeleteUserPathParams } from '../../../models/ts/userController/DeleteUser'

/**
 * @description This can only be done by the logged in user.
 * @summary Delete user
 * @link /user/:username
 */
export async function deleteUser(
  username: DeleteUserPathParams['username'],
  options: Partial<Parameters<typeof client>[0]> = {},
): Promise<ResponseConfig<DeleteUserMutationResponse>['data']> {
  const { data: resData } = await client<DeleteUserMutationResponse>({
    method: 'delete',
    url: `/user/${username}`,
    ...options,
  })

  return resData
}
