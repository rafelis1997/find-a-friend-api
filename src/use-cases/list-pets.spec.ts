import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { ListPetsUseCase } from './list-pets'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: ListPetsUseCase

describe('List Pets Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new ListPetsUseCase(petsRepository)
  })

  it('should be able to list pets without filter', async () => {
    orgsRepository.items.push({
      id: 'org-1',
      email: 'testOrg@example.com',
      title: 'Test Organization',
      password_hash: '123456',
      admin_name: 'John Doe',
      address_name: 'Empty Street, 123',
      city: 'San Francisco',
      phone: '+55123456789',
      zip_code: 12345678,
      description: null,
      created_at: new Date(),
    })

    petsRepository.items.push({
      id: 'pet-1',
      name: 'Frajola',
      org_id: 'org-1',
      puppy_age: 'PUPPY',
      about: null,
      adopted: false,
      environment: 'SMALL_OPEN',
      puppy_adoption_req: '',
      puppy_dependency: 'LOW',
      puppy_energy: 'LOW',
      puppy_photos: '',
      puppy_size: 'BIG',
      updated_at: null,
      created_at: new Date(),
    })

    const { pets } = await sut.execute({ city: 'San Francisco' })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Frajola',
      }),
    ])
  })

  it('should be able to list pets with filter', async () => {
    orgsRepository.items.push({
      id: 'org-1',
      email: 'testOrg@example.com',
      title: 'Test Organization',
      password_hash: '123456',
      admin_name: 'John Doe',
      address_name: 'Empty Street, 123',
      city: 'San Francisco',
      phone: '+55123456789',
      zip_code: 12345678,
      description: null,
      created_at: new Date(),
    })

    petsRepository.items.push({
      id: 'pet-1',
      name: 'Frajola',
      org_id: 'org-1',
      puppy_age: 'ADULT',
      about: null,
      adopted: false,
      environment: 'SMALL_OPEN',
      puppy_adoption_req: '',
      puppy_dependency: 'LOW',
      puppy_energy: 'LOW',
      puppy_photos: '',
      puppy_size: 'BIG',
      updated_at: null,
      created_at: new Date(),
    })

    petsRepository.items.push({
      id: 'pet-2',
      name: 'Camarao',
      org_id: 'org-1',
      puppy_age: 'PUPPY',
      about: null,
      adopted: false,
      environment: 'SMALL_OPEN',
      puppy_adoption_req: '',
      puppy_dependency: 'LOW',
      puppy_energy: 'LOW',
      puppy_photos: '',
      puppy_size: 'BIG',
      updated_at: null,
      created_at: new Date(),
    })

    const { pets: petsCommonFilter } = await sut.execute({
      city: 'San Francisco',
      filters: {
        environment: 'SMALL_OPEN',
      },
    })

    expect(petsCommonFilter).toHaveLength(2)
    expect(petsCommonFilter).toEqual([
      expect.objectContaining({
        name: 'Frajola',
      }),
      expect.objectContaining({
        name: 'Camarao',
      }),
    ])

    const { pets: petsDiffFilter } = await sut.execute({
      city: 'San Francisco',
      filters: {
        environment: 'SMALL_OPEN',
        puppy_age: 'PUPPY',
      },
    })

    expect(petsDiffFilter).toHaveLength(1)
    expect(petsDiffFilter).toEqual([
      expect.objectContaining({
        name: 'Camarao',
      }),
    ])
  })
})
