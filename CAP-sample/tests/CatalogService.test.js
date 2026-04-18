const cds = require('@sap/cds')
const place_order_succeds = require('./code/test-place-order-succeds');

const { GET, POST, PATCH, DELETE, expect, axios } = cds.test (__dirname+'/..', '--with-mocks')
// cds.env.requires.auth = {
//   kind: "dummy"
// };

describe('Catalog service books and manage orders testing', () => {
  it('place order succeds', async () => {
    await place_order_succeds.placeOrderSucceds(GET, POST, PATCH, DELETE, expect);
  });

  it('place order fails', async () => {
    await place_order_succeds.placeOrderFails(GET, POST, PATCH, DELETE, expect);
  });

})
