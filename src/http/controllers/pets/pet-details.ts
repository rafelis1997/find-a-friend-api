import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeGetPetDetailsUseCase } from '@/use-cases/factories/make-get-pet-details-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export async function petDetails(request: FastifyRequest, reply: FastifyReply) {
  const petDetailsParamsSchema = z.object({
    petId: z.string().uuid(),
  })

  const { petId } = petDetailsParamsSchema.parse(request.params)

  try {
    const petDetailsUseCase = makeGetPetDetailsUseCase()

    const { pet } = await petDetailsUseCase.execute(petId)

    return reply.status(200).send({ pet })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
