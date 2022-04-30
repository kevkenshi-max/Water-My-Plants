const db = require('../data/dbConfig.js');
const request = require('supertest');
const server = require('./server.js');

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest()
})

beforeEach(async () => {
    await db('users').truncate()
})

afterAll(async () => {
    await db.destroy()
})

test('verify we are using the correct environment', ()  => {
    expect(process.env.NODE_ENV).toBe('testing');
});

test('[POST] /auth/register', async () => {
    let res = await request(server)
      .post('/auth/register')
      .send({ username: 'Frodo', password: '1234' })
    //expect(res.status).toBe(201);
    expect(res.body).toEqual({ })
})
  
test('[POST] /auth/login', async () => {
    let res = await request(server)
      .post('/auth/login')
      .send({ username: 'Frodo', password: '1234' })
    //expect(res.status).toBe(200);
    expect(res.message).toBe()
    expect(res.body).toEqual({ })
})