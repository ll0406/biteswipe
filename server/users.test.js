const request = require('supertest-as-promised')
const {expect} = require('chai')
const db = require('APP/db')
const User = require('APP/db/models/user')
const app = require('./start')

const plebe = {
  username: 'plebe@secrets.org',
  password: '12345'
}

const jefe = {
  username: 'jefe@secrets.org',
  password: '12345',
  admin: true
}

describe('/api/users', () => {
  before('create a user', () =>
    db.didSync
      .then(() =>
        User.create(
          {
            email: plebe.username,
            password: plebe.password,
        })
        .then(user => {
          plebe.id = user.id;
        })
      )
      .then(() =>
        User.create(
          {
            email: jefe.username,
            password: jefe.password,
            admin: jefe.admin
        })
        .then(user => {
          jefe.id = user.id;
        })
      )
  )

  describe('when not logged', () => {
    it('GET / fails 401 (Unauthorized)', () =>
      request(app)
        .post('/api/users')
        .send({
          email: 'beth@secrets.org',
          password: '12345'
        })
        .expect(401)
    )

    it('POST fails to create a user', () =>
      request(app)
        .post('/api/users')
        .send({
          email: 'beth@secrets.org',
          password: '12345'
        })
        .expect(401)
    )

    it('GET /:id fails 401 (Unauthorized)', () =>
      request(app)
        .get(`/api/users/1`)
        .expect(401)
    )    
  })

  describe('when logged in as non-admin', () => {
    const agent = request.agent(app)
    let accessToken

    before('log in', () => agent
      .post('/api/auth/local/login') 
      .send(plebe)
      .then(res => {
        accessToken = 'Bearer ' + res.body.accessToken
      })
    )

    it('GET / fails 403 (Unauthorized)', () =>
      agent
        .get('/api/users')
        .set('Authorization', accessToken)
        .expect(403)
    )

    it('GET /:id succeeds if current user', () =>
      agent
        .get(`/api/users/${plebe.id}`)
        .set('Authorization', accessToken)
        .expect(200)
        .then(res => {
          expect(res.body.email).to.equal(plebe.username)
        })
    )

    it('GET /:id fails 403 if not current user', () =>
      agent
        .get(`/api/users/${jefe.id}`)
        .set('Authorization', accessToken)
        .expect(403)
    )    

    it('POST fails to create a user', () =>
      agent
        .post('/api/users')
        .set('Authorization', accessToken)
        .send({
          email: 'beth@secrets.org',
          password: '12345'
        })
        .expect(403)
    )
  })  

  describe('when logged in as admin', () => {
    const agent = request.agent(app)
    let accessToken

    before('log in', () => agent
      .post('/api/auth/local/login') 
      .send(jefe)
      .then(res => {
        accessToken = 'Bearer ' + res.body.accessToken
      })
    )

    it('GET / succeeds', () =>
      agent
        .get('/api/users')
        .set('Authorization', accessToken)
        .expect(200)
    )

    it('GET /:id succeeds even if not current user', () =>
      agent
        .get(`/api/users/${plebe.id}`)
        .set('Authorization', accessToken)
        .expect(200)
        .then(res => {
          expect(res.body.email).to.equal(plebe.username)
        })
    )    

    it('POST redirects to the user it just made', () =>
      request(app)
        .post('/api/users')
        .set('Authorization', accessToken)
        .send({
          email: 'eve@interloper.com',
          password: '23456',
        })
        .redirects(1)
        .then(res => {
          expect(res.body.email).to.equal('eve@interloper.com')
        })       
    )
  })
})
