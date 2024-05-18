import { type FastifyReply, type FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'

import {
  voteOnPollParamsValidation,
  voteOnPollValidation,
} from './../validations/vote-on-poll-validation'
import { CreateVote } from '../../votes/use-cases/create-vote'

export const voteOnPollsRoute = async (app: FastifyInstance): Promise<void> => {
  app.post(
    '/polls/:poll_id/votes',
    async (request, reply): Promise<FastifyReply> => {
      const { poll_id } = voteOnPollParamsValidation.parse(request.params)
      const { poll_option_id } = voteOnPollValidation.parse(request.body)
      const createVote = new CreateVote()
      let { session_id } = request.cookies

      if (!session_id) {
        session_id = randomUUID()

        reply.setCookie('session_id', session_id, {
          path: '/',
          maxAge: 60 * 60 * 24 * 30, // 30 days
          signed: true,
          httpOnly: true,
        })
      }

      const vote = await createVote.execute({
        poll_id,
        poll_option_id,
        session_id,
      })

      return reply.status(201).send({ vote })
    },
  )
}
