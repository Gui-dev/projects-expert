import { z } from 'zod'

export const getPollValidation = z.object({
  poll_id: z.string().uuid(),
})
