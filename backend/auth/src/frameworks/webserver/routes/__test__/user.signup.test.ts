import request from 'supertest'
import app from '../../server'

it('Sample test for sigup', async () => {
  return await request(app)
    .post('/api/v1/user/signup/email')
    .expect(200)
})
