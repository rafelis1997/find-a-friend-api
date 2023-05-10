import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
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
