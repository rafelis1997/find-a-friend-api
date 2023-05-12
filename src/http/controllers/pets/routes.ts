import { FastifyInstance } from 'fastify'

import { registerPet } from './register'
import { VerifyJwt } from '@/http/middleware/verify-jwt'

export async function petsRoutes(app: FastifyInstance) {
  /* Authenticated **/
  app.post('/pets/register', { onRequest: [VerifyJwt] }, registerPet)
}
