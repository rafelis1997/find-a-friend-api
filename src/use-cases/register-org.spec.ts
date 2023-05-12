import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { RegisterOrgUseCase } from './register-org'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterOrgUseCase

describe('Register Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterOrgUseCase(orgsRepository)
  })

  it('should be able to hash password on register', async () => {
    const { org } = await sut.execute({
      email: 'testOrg@example.com',
      title: 'Test Organization',
      password: '123456',
      admin_name: 'John Doe',
      address_name: 'Empty Street, 123',
      city: 'San Francisco',
      phone: '+55123456789',
      zip_code: 12345678,
      description: null,
    })

    const isPasswordCorrectlyHashed = await compare('123456', org.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register org with same email twice', async () => {
    await sut.execute({
      email: 'testOrg@example.com',
      title: 'Test Organization',
      password: '123456',
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
        title: 'Test Organization',
        password: '123456',
        admin_name: 'John Doe',
        address_name: 'Empty Street, 123',
        city: 'San Francisco',
        phone: '+55123456789',
        zip_code: 12345678,
        description: null,
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })

  it('should be able to register an org', async () => {
    const { org } = await sut.execute({
      email: 'testOrg@example.com',
      title: 'Test Organization',
      password: '123456',
      admin_name: 'John Doe',
      address_name: 'Empty Street, 123',
      city: 'San Francisco',
      phone: '+55123456789',
      zip_code: 12345678,
      description: null,
    })

    expect(org.id).toEqual(expect.any(String))
  })
})
