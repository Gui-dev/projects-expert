import Fastify from 'fastify'

import { pollsRoute } from '../modules/polls/routes/polls.route'

const app = Fastify()
const PORT = 3333 || process.env.PORT

app.register(pollsRoute)

app
  .listen({
    port: PORT,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log(`❤️  HTTP server running!!! http://localhost:${PORT}`)
  })
