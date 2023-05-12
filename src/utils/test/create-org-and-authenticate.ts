import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrg(
  app: FastifyInstance,
  isAdmin = false,
) {
  const { id } = await prisma.org.create({
    data: {
      email: 'testOrg@example.com',
      title: 'Test Organization',
      password_hash: await hash('12345678', 6),
      admin_name: 'John Doe',
      address_name: 'Empty Street, 123',
      city: 'San Francisco',
      phone: '+55123456789',
      role: isAdmin ? 'ADMIN' : 'MEMBER',
      zip_code: 12345678,
      description: null,
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'testOrg@example.com',
    password: '12345678',
  })

  const { token } = authResponse.body

  return { token, id }
}
