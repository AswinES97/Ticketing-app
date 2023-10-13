import request from 'supertest'
import app from '../../server'

it('Sample test for sigup', async () => {
  return await request(app)
    .post('/api/v1/user/signup/email')
    .send({ email: 'aswinedassery@gmail.com', password: 'Aswines@123' })
    .expect(200)
})
