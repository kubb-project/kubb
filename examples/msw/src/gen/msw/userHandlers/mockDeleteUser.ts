import { rest } from 'msw'
import { createDeleteUserMutationResponse } from '../../mocks/userMocks/createDeleteUser'

export const mockDeleteUserHandler = rest.get('*/user/:username', function handler(req, res, ctx) {
  return res(ctx.json(createDeleteUserMutationResponse()))
})