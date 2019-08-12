const chai = require('chai')
const chaiHttp = require('chai-http')

const should = chai.should()
const BASE_URL = 'http://127.0.0.1:3000'

chai.use(chaiHttp)
describe('Auth', () => {
  beforeEach(done => {
    done()
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
  })
})
