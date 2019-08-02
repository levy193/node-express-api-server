const { notEmpty } = require('../utils')

module.exports = {
  description: 'Generate api module',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'service name:',
      validate: notEmpty('name')
    }
  ],
  actions: data => {
    const actions = [
      {
        type: 'add',
        path: `src/services/${data.name}.js`,
        templateFile: 'plop-templates/service/index.hbs',
        data: {
          name: data.name
        }
      }
    ]
    return actions
  }
}
