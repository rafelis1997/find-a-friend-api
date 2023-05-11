import { Org, Prisma } from '@prisma/client'

export interface OrgsRepository {
  listAll(): Promise<Org[]>
  findByEmail(email: string): Promise<Org | null>
  findById(id: string): Promise<Org | null>
  create(data: Prisma.OrgCreateInput): Promise<Org>
}
