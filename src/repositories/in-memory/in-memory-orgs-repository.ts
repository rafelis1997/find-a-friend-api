import { Org, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

import { OrgsRepository } from '../orgs-repository'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async findById(id: string) {
    const org = this.items.find((item) => item.id === id)

    if (!org) {
      return null
    }

    return org
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: randomUUID(),
      email: data.email,
      title: data.title,
      password_hash: data.password_hash,
      description: data.description ?? null,
      admin_name: data.admin_name,
      address_name: data.address_name,
      city: data.city,
      phone: data.phone,
      zip_code: data.zip_code,
      created_at: new Date(),
    } satisfies Prisma.OrgCreateInput

    this.items.push(org)

    return org
  }
}
