import { z } from 'zod'

export const getPollResultParams = z.object({
  poll_id: z.string().uuid(),
})
