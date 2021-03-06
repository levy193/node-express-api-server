const chai = require('chai')
const chaiHttp = require('chai-http')

const should = chai.should()
const BASE_URL = 'http://127.0.0.1:3000'

chai.use(chaiHttp)

describe('User', () => {
  // Set all test case done before start a new test
  beforeEach(done => {
    done()
  })

  // Get api
  describe('GET /', () => {
    it('', done => {
      chai
        .request('BASE_URL')
        .get('/')
        .send()
        .end((err, res) => {
          res.should.have.status(200)
          done()
        })
    })
  })
})
