import { makeListPetsUseCase } from '@/use-cases/factories/make-list-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function listPets(request: FastifyRequest, reply: FastifyReply) {
  const listPetsParamsSchema = z.object({
    city: z.string(),
  })

  const listPetsQuerySchema = z
    .object({
      puppy_age: z.enum(['PUPPY', 'ADULT', 'ELDER']).optional(),
      puppy_size: z.enum(['SMALL', 'MEDIUM', 'BIG']).optional(),
      puppy_energy: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
      environment: z.enum(['CLOSED', 'SMALL_OPEN', 'WIDE_OPEN']).optional(),
      puppy_dependency: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
    })
    .optional()

  const { city } = listPetsParamsSchema.parse(request.params)

  const filters = listPetsQuerySchema.parse(request.query)

  try {
    const listPetsUseCase = makeListPetsUseCase()

    const { pets } = await listPetsUseCase.execute({
      city: city.toLowerCase().replace('-', ' '),
      filters,
    })

    return reply.status(200).send(pets)
  } catch (error) {
    return reply.status(500).send({ error })
  }
}
