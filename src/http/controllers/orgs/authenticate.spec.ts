import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'

describe('Authenticate Org (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh org token', async () => {
    await request(app.server).post('/orgs').send({
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

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'testOrg@example.com',
      password: '12345678',
    })

    expect(authResponse.statusCode).toEqual(200)
    expect(authResponse.body).toEqual({
      token: expect.any(String),
    })
  })
})
