const cds = require('@sap/cds')

const { GET, POST, expect, axios } = cds.test (__dirname+'/..')
axios.defaults.auth = { username: 'bob', password: 'bob' }

describe('OData APIs', () => {

  it('serves OrderService.Orders', async () => {

  })

})
