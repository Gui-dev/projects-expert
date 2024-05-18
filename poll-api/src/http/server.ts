import Fastify from 'fastify'
import cookie from '@fastify/cookie'
import websocket from '@fastify/websocket'

import { createPollsRoute } from '../modules/polls/routes/create-polls.route'
import { getPollsRoute } from '../modules/polls/routes/get-polls.route'
import { voteOnPollsRoute } from '../modules/votes/routes/vote-on-polls.route'
import { pollResultRoute } from '../modules/websocket/routes/poll-result.route'

const app = Fastify()
const PORT = 3333 || process.env.PORT

app.register(cookie, {
  secret: process.env.COOKIE_SECRET,
  hook: 'onRequest',
})
app.register(websocket)

app.register(createPollsRoute)
app.register(getPollsRoute)
app.register(voteOnPollsRoute)
app.register(pollResultRoute)

app
  .listen({
    port: PORT,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log(`❤️  HTTP server running!!! http://localhost:${PORT}`)
  })
