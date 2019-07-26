const DIContainer = require('../src/utils/DIContainer')

const diContainer = new DIContainer()

diContainer.factory('test', require('../src/utils/index').test)

const test = diContainer.get('test')

console.log(test)
