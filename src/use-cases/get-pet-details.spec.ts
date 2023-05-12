import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { GetPetDetailsUseCase } from './get-pet-details'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: GetPetDetailsUseCase

describe('Get Pet Details Pet Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new GetPetDetailsUseCase(petsRepository)
  })

  it('should be able to get pet details', async () => {
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

    const { pet } = await sut.execute('pet-1')
    expect(pet).toEqual(
      expect.objectContaining({
        name: 'Frajola',
      }),
    )
  })

  it('should be able to get error when pet not found', async () => {
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

    await expect(sut.execute('non-existent-id')).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})
