const { notEmpty } = require('../utils')

module.exports = {
  description: 'Generate test module',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'test name:',
      validate: notEmpty('name')
    }
  ],
  actions: data => {
    const actions = [
      {
        type: 'add',
        path: `test/${data.name}.js`,
        templateFile: 'plop-templates/test/index.hbs',
        data: {
          name: data.name
        }
      }
    ]
    return actions
  }
}
