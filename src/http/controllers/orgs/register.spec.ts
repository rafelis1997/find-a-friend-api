import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register Org (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register org', async () => {
    const response = await request(app.server).post('/orgs').send({
      email: 'testOrg@example.com',
      title: 'Test Organization',
      password: '12345678',
      admin_name: 'John Doe',
      address_name: 'Empty Street, 123',
      city: 'San Francisco',
      phone: '+55123456789',
      zip_code: 12345678,
      description: null,
    })

    expect(response.statusCode).toEqual(201)
  })
})
