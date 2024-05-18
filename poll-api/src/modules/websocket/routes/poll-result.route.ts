import { type FastifyInstance } from 'fastify'
import { getPollResultParams } from '../validations/get-poll-result-validation'
import { voting } from '../services/voting-pub-sub'

export const pollResultRoute = async (app: FastifyInstance): Promise<void> => {
  app.get(
    '/polls/:poll_id/results',
    { websocket: true },
    (connection, request) => {
      const { poll_id } = getPollResultParams.parse(request.params)

      voting.subscriber(poll_id, (message) => {
        connection.send(JSON.stringify(message))
      })
    },
  )
}
