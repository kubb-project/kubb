import type { User } from '../User'

/**
 * @description successful operation
 */
export type CreateUsersWithListInputError = any | null

export type CreateUsersWithListInputMutationRequest = User[]

/**
 * @description Successful operation
 */
export type CreateUsersWithListInputMutationResponse = User

export type CreateUsersWithListInput = {
  response: CreateUsersWithListInputMutationResponse
  request: CreateUsersWithListInputMutationRequest
  errors: CreateUsersWithListInputError
}
