import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/test/create-org-and-authenticate'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register pet', async () => {
    const { token } = await createAndAuthenticateOrg(app, true)

    const response = await request(app.server)
      .post('/pets/register')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Camarao',
        org_id: 'org-1',
        puppy_age: 'ADULT',
        puppy_energy: 'LOW',
      })

    expect(response.statusCode).toEqual(201)
  })
})
