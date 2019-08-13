const chai = require('chai')
const chaiHttp = require('chai-http')

const should = chai.should()
const BASE_URL = 'http://127.0.0.1:3000'

chai.use(chaiHttp)

describe('Auth', () => {
  beforeEach(done => {
    done()
  })

  // Register api
  describe('POST /auth/register', () => {
    it('REGISTER_SUCCESS', done => {
      let account = {
        username: 'test',
        password: '123456',
        email: 'test@gmail.com',
        displayName: 'Test'
      }

      chai
        .request(BASE_URL)
        .post('/auth/register')
        .send(account)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('accessToken')
          done()
        })
    })
  })


  // Login api
  describe('POST /auth/login', () => {
    it('LOGIN_SUCCESS', done => {
      let account = {
        username: 'levy193',
        password: 'levy193'
      }

      chai
        .request(BASE_URL)
        .post('/auth/login')
        .send(account)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('accessToken')
          done()
        })
    })

    it('LOGIN_FAILED', done => {
      let account = {
        username: 'test',
        password: 'abc123'
      }

      chai
        .request(BASE_URL)
        .post('/auth/login')
        .send(account)
        .end((err, res) => {
          res.should.have.not.status(200)
          done()
        })
    })
  })
})
