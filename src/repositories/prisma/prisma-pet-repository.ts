import { Pet, Prisma } from '@prisma/client'
import { Filters, PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async findById(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({
      include: {
        org: true,
      },
      where: {
        id,
      },
    })

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
    const pets = await prisma.pet.findMany({
      include: {
        org: {
          select: {
            city: true,
          },
        },
      },
      where: {
        org: {
          city,
        },
        puppy_age: filters?.puppy_age,
        puppy_dependency: filters?.puppy_dependency,
        puppy_energy: filters?.puppy_energy,
        puppy_size: filters?.puppy_size,
      },
    })

    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }
}
