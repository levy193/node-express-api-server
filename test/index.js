const DiContainer = require('../src/utils/di-container')

const diContainer = new DiContainer()

diContainer.factory('test', require('../src/utils/index').test)

const test = diContainer.get('test')

console.log(test)
