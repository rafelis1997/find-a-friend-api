import { Pet, Prisma } from '@prisma/client'

export interface Filters {
  puppy_age?: 'PUPPY' | 'ADULT' | 'ELDER'
  puppy_size?: 'SMALL' | 'MEDIUM' | 'BIG'
  puppy_energy?: 'LOW' | 'MEDIUM' | 'HIGH'
  environment?: 'CLOSED' | 'SMALL_OPEN' | 'WIDE_OPEN'
  puppy_dependency?: 'LOW' | 'MEDIUM' | 'HIGH'
}

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>
  listPets({
    city,
    filters,
  }: {
    city: string
    filters?: Filters
  }): Promise<Pet[]>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
