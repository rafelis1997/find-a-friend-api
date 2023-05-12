import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'

import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeRegisterPetUseCase } from '@/use-cases/factories/make-register-pet-use-case'

export async function registerPet(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerPetBodySchema = z.object({
    name: z.string(),
    about: z.string().optional(),
    adopted: z.boolean().optional().default(false),
    environment: z
      .enum(['SMALL_OPEN', 'WIDE_OPEN', 'CLOSED'])
      .default('WIDE_OPEN'),
    puppy_adoption_req: z.string().optional().nullable(),
    puppy_age: z.enum(['PUPPY', 'ADULT', 'ELDER']).default('ADULT'),
    puppy_dependency: z.enum(['LOW', 'MEDIUM', 'HIGH']).default('MEDIUM'),
    puppy_energy: z.enum(['LOW', 'MEDIUM', 'HIGH']).default('MEDIUM'),
    puppy_photos: z.string().optional().nullable(),
    puppy_size: z.enum(['SMALL', 'MEDIUM', 'BIG']).default('MEDIUM'),
  })

  const {
    name,
    about,
    adopted,
    environment,
    puppy_adoption_req,
    puppy_age,
    puppy_dependency,
    puppy_energy,
    puppy_photos,
    puppy_size,
  } = registerPetBodySchema.parse(request.body)

  try {
    const registerPetUseCase = makeRegisterPetUseCase()

    const { pet } = await registerPetUseCase.execute({
      name,
      about,
      org_id: request.user.sub,
      adopted,
      environment,
      puppy_adoption_req,
      puppy_age,
      puppy_dependency,
      puppy_energy,
      puppy_photos,
      puppy_size,
    })
    return reply.status(201).send({ pet })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(401).send({ message: error.message })
    }

    throw error
  }
}
