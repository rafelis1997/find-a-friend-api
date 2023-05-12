import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pet-repository'
import { ListPetsUseCase } from '../list-pets'

export function makeListPetsUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const UseCase = new ListPetsUseCase(prismaPetsRepository)

  return UseCase
}
