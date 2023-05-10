import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { RegisterPetUseCase } from './register-pet'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: RegisterPetUseCase

describe('Register Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterPetUseCase(petsRepository, orgsRepository)
  })

  it('should not be able to register a pet without a valid org', async () => {
    await expect(
      sut.execute({
        name: 'Frajola',
        org_id: 'org-2',
        puppy_age: 'PUPPY',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should be able to register an pet', async () => {
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

    const { pet } = await sut.execute({
      name: 'Frajola',
      org_id: 'org-1',
      puppy_age: 'PUPPY',
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
