import { FastifyInstance } from 'fastify'

import { registerPet } from './register'
import { VerifyJwt } from '@/http/middleware/verify-jwt'
import { petDetails } from './pet-details'
import { listPets } from './list-pets'
import { verifyUserRole } from '@/http/middleware/verify-roles'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/:city', listPets)

  app.get('/pets/details/:petId', petDetails)

  /* Authenticated **/
  app.post(
    '/pets/register',
    { onRequest: [VerifyJwt, verifyUserRole('ADMIN')] },
    registerPet,
  )
}
