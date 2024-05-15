import { z } from 'zod'

export const createPollValidation = z.object({
  title: z.string(),
  options: z.array(z.string()),
})

export const createPollResponseValidation = z.object({
  poll_id: z.string().uuid(),
})

export type CreatePollResponse = z.infer<typeof createPollResponseValidation>
