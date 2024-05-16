import { z } from 'zod'

export const voteOnPollParamsValidation = z.object({
  poll_id: z.string().uuid(),
})

export const voteOnPollValidation = z.object({
  poll_option_id: z.string().uuid(),
})

// export const createPollResponseValidation = z.object({
//   poll_id: z.string().uuid(),
// })

// export type CreatePollResponse = z.infer<typeof createPollResponseValidation>
