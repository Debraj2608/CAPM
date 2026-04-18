const cds = require('@sap/cds')
const place_order_succeds = require('./code/test-place-order');
const place_order_fails = require('./code/test-place-order');
const cancel_order_succeds = require('./code/test-cancel-order');
const cancel_order_fails = require('./code/test-cancel-order');

const { GET, POST, PATCH, DELETE, expect, axios } = cds.test (__dirname+'/..', '--with-mocks')
// cds.env.requires.auth = {
//   kind: "dummy"
// };

describe('Catalog service books and manage orders testing', () => {
  it('place order succeds', async () => {
    await place_order_succeds.placeOrderSucceds(GET, POST, PATCH, DELETE, expect);
  });

  it('place order fails', async () => {
    await place_order_fails.placeOrderFails(GET, POST, PATCH, DELETE, expect);
  });

  it('cancel order succeds', async () => {
    await cancel_order_succeds.cancelOrderSucceds(GET, POST, PATCH, DELETE, expect);
  });

  it('cancel order fails', async () => {
    await cancel_order_succeds.cancelOrderFails(GET, POST, PATCH, DELETE, expect);
  })

})
