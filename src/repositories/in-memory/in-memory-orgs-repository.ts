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

  findById(id: string): Promise<Org | null> {
    throw new Error('Method not implemented.')
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: randomUUID(),
      email: data.email,
      title: data.title,
      password_hash: data.password_hash,
      description: data.description ?? null,
      admin_name: data.admin_name,
      adress_name: data.adress_name,
      phone: data.phone,
      zip_code: data.zip_code,
      created_at: new Date(),
    } satisfies Prisma.OrgCreateInput

    this.items.push(org)

    return org
  }
}
