import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pet-repository'
import { RegisterPetUseCase } from '../register-pet'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'

export function makeRegisterPetUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const prismaOrgsRepository = new PrismaOrgsRepository()
  const UseCase = new RegisterPetUseCase(
    prismaPetsRepository,
    prismaOrgsRepository,
  )

  return UseCase
}
