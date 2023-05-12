import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/test/create-org-and-authenticate'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Get Pet Details (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register pet', async () => {
    const { token } = await createAndAuthenticateOrg(app, true)

    const responsePetCreation = await request(app.server)
      .post('/pets/register')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Camarao',
        puppy_age: 'ADULT',
        puppy_energy: 'LOW',
      })

    const response = await request(app.server)
      .get(`/pets/details/${responsePetCreation.body.pet.id}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
      }),
    )
  })
})
