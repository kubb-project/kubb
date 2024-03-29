import { userSchema } from './userSchema'
import { z } from 'zod'
import type { UserArray } from '../models/ts/UserArray'

export const userArraySchema = z.array(z.lazy(() => userSchema)) as z.ZodType<UserArray>
