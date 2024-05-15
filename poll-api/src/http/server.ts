import Fastify from 'fastify'

import { createPollsRoute } from '../modules/polls/routes/create-polls.route'
import { getPollsRoute } from '../modules/polls/routes/get-polls.route'

const app = Fastify()
const PORT = 3333 || process.env.PORT

app.register(createPollsRoute)
app.register(getPollsRoute)

app
  .listen({
    port: PORT,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log(`❤️  HTTP server running!!! http://localhost:${PORT}`)
  })
