const { notEmpty } = require('../utils')

module.exports = {
  description: 'Generate api module',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'api file name:',
      validate: notEmpty('name')
    }
  ],
  actions: data => {
    const actions = [
      {
        type: 'add',
        path: `src/models/${data.name}.js`,
        templateFile: 'plop-templates/model/index.hbs',
        data: {
          method: data.method,
          path: data.path
        }
      }
    ]
    return actions
  }
}
