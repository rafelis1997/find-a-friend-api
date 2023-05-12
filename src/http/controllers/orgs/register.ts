import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeRegisterOrgUseCase } from '@/use-cases/factories/make-register-org-use-case'
import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    title: z.string(),
    admin_name: z.string(),
    address_name: z.string(),
    city: z.string(),
    description: z.string().optional().nullable(),
    phone: z.string(),
    zip_code: z.coerce.number(),
  })

  const {
    email,
    password,
    title,
    admin_name,
    address_name,
    city,
    description,
    phone,
    zip_code,
  } = registerBodySchema.parse(request.body)

  try {
    const registerOrgUseCase = makeRegisterOrgUseCase()

    await registerOrgUseCase.execute({
      email,
      password,
      title,
      admin_name,
      address_name,
      city,
      description: description ?? null,
      phone,
      zip_code,
    })
  } catch (error) {
    if (error instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }

  return reply.status(201).send()
}
