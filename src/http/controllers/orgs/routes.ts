import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { refreshToken } from './refresh'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', register)

  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refreshToken)
}
