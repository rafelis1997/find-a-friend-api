import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'

import { OrgsRepository } from '@/repositories/orgs-repository'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

interface RegisterOrgUseCaseRequest {
  title: string
  description: string | null
  admin_name: string
  address_name: string
  city: string
  email: string
  password: string
  phone: string
  zip_code: number
}

interface RegisterOrgUseCaseResponse {
  org: Org
}

export class RegisterOrgUseCase {
  constructor(private orgRepository: OrgsRepository) {}

  async execute({
    email,
    password,
    title,
    admin_name,
    city,
    address_name,
    description,
    phone,
    zip_code,
  }: RegisterOrgUseCaseRequest): Promise<RegisterOrgUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const orgWithSameEmail = await this.orgRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    const org = await this.orgRepository.create({
      email,
      password_hash,
      title,
      admin_name,
      address_name,
      city,
      description,
      phone,
      zip_code,
    })

    return { org }
  }
}
