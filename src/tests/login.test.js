const app = require('../server');
const request = require('supertest');

// success
describe('login', () => {
  it('return 200 if username and password is authenticate', async () => {
    const res = await request(app).post('/user/login').send({
      mail: 'namdv',
      password: 'Ssv@123456'
    });
    expect(res.statusCode).toEqual(200)
  });
})

// error
describe('login', () => {
  it('return 200 if username and password is authenticate', async () => {
    const res = await request(app).post('/user/login').send({
      mail: 'namdv1',
      password: 'Ssv@123456'
    });
    expect(res.statusCode).toEqual(401)
  });
})

// exception
describe('login', () => {
  it('return 200 if username and password is authenticate', async () => {
    const res = await request(app).post('/user/login').send({
      mail1: 'namdv1',
      password: 'Ssv@123456'
    });
    expect(res.statusCode).toEqual(500)
  });
})