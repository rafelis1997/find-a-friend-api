import { FastifyInstance } from 'fastify'

import { registerPet } from './register'
import { VerifyJwt } from '@/http/middleware/verify-jwt'
import { petDetails } from './pet-details'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/:petId', petDetails)

  /* Authenticated **/
  app.post('/pets/register', { onRequest: [VerifyJwt] }, registerPet)
}
