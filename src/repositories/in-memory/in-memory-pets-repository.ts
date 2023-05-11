import { Pet, Prisma } from '@prisma/client'
import { Filters, PetsRepository } from '../pets-repository'
import { randomUUID } from 'node:crypto'
import { OrgsRepository } from '../orgs-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  constructor(private orgsRepository: OrgsRepository) {}

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async listPets({
    city,
    filters,
  }: {
    city: string
    filters?: Filters | undefined
  }): Promise<Pet[]> {
    const orgsListByCity = (await this.orgsRepository.listAll()).filter(
      (org) => org.city.toLowerCase() === city.toLowerCase(),
    )

    const petListByCity: Pet[] = orgsListByCity
      .map((org) => {
        return this.items.filter((pet) => pet.org_id === org.id)
      })
      .flat()

    if (filters !== undefined) {
      let filteredPets: Pet[] = [...petListByCity]
      Object.entries(filters).forEach(([key, value]) => {
        const petsByFilter = filteredPets.filter(
          (pet) => pet[key as keyof Pet] === value,
        )
        filteredPets = [...petsByFilter]
      })

      return filteredPets
    }

    return petListByCity
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      org_id: data.org_id,
      adopted: data.adopted ?? false,
      environment: data.environment ?? 'SMALL_OPEN',
      about: data.about ?? null,
      puppy_adoption_req: data.puppy_adoption_req ?? null,
      puppy_age: data.puppy_age ?? 'ADULT',
      puppy_dependency: data.puppy_dependency ?? 'MEDIUM',
      puppy_energy: data.puppy_energy ?? 'MEDIUM',
      puppy_photos: data.puppy_photos ?? null,
      puppy_size: data.puppy_size ?? 'MEDIUM',
      created_at: new Date(),
      updated_at: null,
    } satisfies Prisma.PetUncheckedCreateInput

    this.items.push(pet)

    return pet
  }
}
