import { Filters, PetsRepository } from '@/repositories/pets-repository'

export class ListPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ city, filters }: { city: string; filters?: Filters }) {
    const pets = await this.petsRepository.listPets({ city, filters })

    return { pets }
  }
}
