const request = require('supertest-as-promised')
const {expect} = require('chai')
const db = require('APP/db')
const User = require('APP/db/models/user')
const app = require('./start')

const alice = {
  username: 'alice@secrets.org',
  password: '12345'
}

describe('/api/auth', () => {
  before('create a user', () =>
    db.didSync
      .then(() =>
        User.create(
          {
            email: alice.username,
            password: alice.password,
        })
      )
  )

  describe('POST /local/login (username, password)', () => {
    it('succeeds with a valid username and password', () =>
      request(app)
        .post('/api/auth/local/login')
        .send(alice)
        .expect(200)
        .then(res => {
          expect(res.body.refreshToken).to.not.be.null
          expect(res.body.accessToken).to.not.be.null
        })
      )

    it('fails with an invalid username and password', () =>
      request(app)
        .post('/api/auth/local/login')
        .send({username: alice.username, password: 'wrong'})
        .expect(401)
      )      
  })

  describe('GET /token', () => {
    const agent = request.agent(app)
    let refreshToken

    before('log in', () => agent
      .post('/api/auth/local/login') 
      .send(alice)
      .then(res => {
        refreshToken = 'Bearer ' + res.body.refreshToken
      })
    )

    it('responds with a new access token if given a valid refresh token', () =>
      agent
        .get('/api/auth/token')
        .set('Authorization', refreshToken)        
        .expect(200)          
        .then(res => {
          expect(res.body.accessToken).to.not.be.null
        })
    )

    it('fails with a invalid refresh token', () =>
      agent.get('/api/auth/token')
        .set('Authorization', 'yomama')
        .expect(401)
    )
  })

  describe('POST /logout when logged in', () => {
    const agent = request.agent(app)
    let refreshToken

    before('log in', () => 
      agent
      .post('/api/auth/local/login') 
      .send(alice)
      .then(res => {
        refreshToken = res.body.refreshToken
      })
    )

    it('deletes the current refresh token', () => 
      agent
      .post('/api/auth/logout')
      .send({
        refreshToken: refreshToken
      })
      .expect(200)
      .then(() =>
        User.findOne({
          where: {
            email: alice.username
          }
        })
        .then(user => {
          expect(user.refresh_token).to.be.empty
        })
      )
    )
  })

  describe('POST /signup', () => {
    it('creates a new user', () => 
      request(app)
      .post('/api/auth/signup')
      .send({
        name: 'da freshness',
        email: 'da@freshness.com',
        password: 'lmao12'
      })
      .expect(200)
      .then(() =>
        User.findOne({
          where: {
            email: 'da@freshness.com'
          }
        })
        .then(user => {
          expect(user).to.not.be.null
        })
      )
    )
  })

})