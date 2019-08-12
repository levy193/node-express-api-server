const { notEmpty } = require('../utils')

module.exports = {
  description: 'Generate api module',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'api file name:',
      validate: notEmpty('name')
    },
    {
      type: 'input',
      name: 'service',
      message: 'service:',
      validate: notEmpty('service')
    },
    {
      type: 'list',
      name: 'method',
      message: 'method:',
      choices: [
        {
          name: 'GET',
          value: 'get',
          checked: true
        },
        {
          name: 'POST',
          value: 'post'
        },
        {
          name: 'PUT',
          value: 'put'
        },
        {
          name: 'DELETE',
          value: 'delete'
        }
      ]
    },
    {
      type: 'input',
      name: 'path',
      message: 'api path:'
    }
  ],
  actions: data => {
    const actions = [
      {
        type: 'add',
        path: `src/api/${data.name}.js`,
        templateFile: 'plop-templates/api/index.hbs',
        data: {
          method: data.method,
          path: data.path
        }
      }
    ]
    return actions
  }
}
