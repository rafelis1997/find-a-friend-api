import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pet-repository'
import { GetPetDetailsUseCase } from '../get-pet-details'

export function makeGetPetDetailsUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const UseCase = new GetPetDetailsUseCase(prismaPetsRepository)

  return UseCase
}
