import { type FastifyReply, type FastifyInstance } from 'fastify'
import { createPollValidation } from '../validations/create-poll-validation'
import { CreatePoll } from '../use-cases/create-poll'

export const pollsRoute = async (app: FastifyInstance): Promise<void> => {
  app.post('/polls', async (request, reply): Promise<FastifyReply> => {
    const { title } = createPollValidation.parse(request.body)
    const createPoll = new CreatePoll()
    const poll = await createPoll.execute({ title })
    return reply.status(201).send(poll)
  })
}
