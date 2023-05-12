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

  it('should be able to list pets to a given city without filters', async () => {
    const { token } = await createAndAuthenticateOrg(app, true)

    await request(app.server)
      .post('/pets/register')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Camarao',
        puppy_age: 'PUPPY',
        puppy_energy: 'LOW',
      })

    // await request(app.server)
    //   .post('/pets/register')
    //   .set('Authorization', `Bearer ${token}`)
    //   .send({
    //     name: 'Frajola',
    //     puppy_age: 'ADULT',
    //     puppy_energy: 'LOW',
    //   })

    const response = await request(app.server).get(`/pets/san-francisco`).send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toHaveLength(1)
    expect(response.body).toEqual([
      expect.objectContaining({
        name: 'Camarao',
      }),
    ])
  })

  it('should be able to list pets to a given city with filters', async () => {
    const { token } = await createAndAuthenticateOrg(app, true)

    await request(app.server)
      .post('/pets/register')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Camarao',
        puppy_age: 'PUPPY',
        puppy_energy: 'LOW',
      })

    await request(app.server)
      .post('/pets/register')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Frajola',
        puppy_age: 'ADULT',
        puppy_energy: 'LOW',
      })

    const response = await request(app.server)
      .get(`/pets/san-francisco`)
      .query({
        puppy_age: 'ADULT',
      })
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toHaveLength(1)
    expect(response.body).toEqual([
      expect.objectContaining({
        name: 'Frajola',
      }),
    ])
  })
})
