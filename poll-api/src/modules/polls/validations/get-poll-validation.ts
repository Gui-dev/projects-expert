import { z } from 'zod'

export const getPollValidation = z.object({
  poll_id: z.string().uuid(),
})

const getPollResponseValidation = z.object({
  id: z.string().uuid(),
  title: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
  poll_options: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
    }),
  ),
})

export type GetPollResponseValidation = z.infer<
  typeof getPollResponseValidation
>
