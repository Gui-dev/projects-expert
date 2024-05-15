import { type FastifyReply, type FastifyInstance } from 'fastify'
import { getPollValidation } from '../validations/get-poll-validation'
import { GetPoll } from '../use-cases/get-poll'

export const getPollsRoute = async (app: FastifyInstance): Promise<void> => {
  app.get('/polls/:poll_id', async (request, reply): Promise<FastifyReply> => {
    const { poll_id } = getPollValidation.parse(request.params)
    const getPoll = new GetPoll()
    const poll = await getPoll.execute(poll_id)
    return reply.status(200).send(poll)
  })
}
