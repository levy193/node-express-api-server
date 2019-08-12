const Mocha = require('mocha')
const Application = require('../src/app.js')

const mocha = new Mocha()


const test = async () => {
  const app = new Application()

  // Start server
  await app.boot()

  // Testing case
  mocha.addFile('./test/auth.js')

  mocha.run()
}

// Start test
test()
