import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcrypt'

import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateUseCase

describe('Register Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgsRepository)
  })

  it('should not be able authenticate with wrong email', async () => {
    await orgsRepository.create({
      email: 'testOrg@example.com',
      title: 'Test Organization',
      password_hash: await hash('123456', 6),
      admin_name: 'John Doe',
      address_name: 'Empty Street, 123',
      phone: '+55123456789',
      city: 'San Francisco',
      zip_code: 12345678,
      description: null,
    })

    await expect(
      sut.execute({
        email: 'worgEmail@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able authenticate with wrong password', async () => {
    await orgsRepository.create({
      email: 'testOrg@example.com',
      title: 'Test Organization',
      password_hash: await hash('123456', 6),
      admin_name: 'John Doe',
      address_name: 'Empty Street, 123',
      city: 'San Francisco',
      phone: '+55123456789',
      zip_code: 12345678,
      description: null,
    })

    await expect(
      sut.execute({
        email: 'testOrg@example.com',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should be able to authenticate an org', async () => {
    await orgsRepository.create({
      email: 'testOrg@example.com',
      title: 'Test Organization',
      password_hash: await hash('123456', 6),
      admin_name: 'John Doe',
      address_name: 'Empty Street, 123',
      city: 'San Francisco',
      phone: '+55123456789',
      zip_code: 12345678,
      description: null,
    })

    const { org } = await sut.execute({
      email: 'testOrg@example.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })
})
