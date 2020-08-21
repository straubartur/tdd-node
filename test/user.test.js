const request = require('supertest')

const app = require('../src/app')
const name = 'Artur'

test('Shoud print all users', () => {
  return request(app).get('/users')
    .then(res => {
      expect(res.status).toBe(200)
      expect(res.body.length).toBeGreaterThan(0)
    })
})


test('Shoud create user with success', () => {
  return request(app)
    .post('/users')
    .send({
      'name': name,
      'email': 'mike@mike.com',
      'passwd': '123'
    })
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .then(res => {
      expect(res.status).toBe(201)
    })
})

test('doesnt insert usert without name', () => {
  return request(app)
    .post('/users')
    .send({
      'email': 'mike@mike.com',
      'passwd': '123'
    })
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .then(res => {
      expect(res.status).toBe(400)
      expect(res.body.error).toBe('Nome é um atributo obrigatório')
    })
})


test('doesnt insert usert without mail', async () => {
  const res = await request(app)
    .post('/users')
    .send({
      'name': 'mike@mike.com',
      'passwd': '123'
    })
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
  expect(res.status).toBe(400)
  expect(res.body.error).toBe('email é um atributo obrigatório')
})

test('doesnt insert usert without passwd', (done) => {
  request(app)
    .post('/users')
    .send({
      'email': 'mike@mike.com',
      'name': '123'
    })
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .then(res => {
      expect(res.status).toBe(400)
      expect(res.body.error).toBe('passwd é um atributo obrigatório')
      done();
    })
})

test('doesnt insert user with non unique name', () => {
  request(app)
    .post('/users')
    .send({
      'name': name,
      'email': 'mike@mike.com',
      'passwd': '123'
    })
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
  .then(res => {
    expect(res.status).toBe(400)
    expect(res.body.error).toBe('Já existe um usuario com esse nome')
  })
})