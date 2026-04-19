const cds = require('@sap/cds')
const confirm_order_succeds = require('./code/test-confirm-order');
const confirm_order_fails = require('./code/test-confirm-order');
const ship_order_succeds = require('./code/test-ship-order');
const ship_order_fails = require('./code/test-ship-order');
const deliver_order_succeds = require('./code/test-deliver-order');
const deliver_order_fails = require('./code/test-deliver-order');
const { GET, POST, PATCH, DELETE, expect, axios } = cds.test (__dirname+'/..')

describe('Order service testing', () => {
  it('confirm order test succeds', async () => {
    await confirm_order_succeds.confirmOrderSucceds(GET, POST, PATCH, DELETE, expect);
  })

  it('confirm order test fails', async () => {
    await confirm_order_succeds.confirmOrderFails(GET, POST, PATCH, DELETE, expect);
  })

  it('ship order test succeds', async () => {
    await ship_order_succeds.shipOrderSucceds(GET, POST, PATCH, DELETE, expect);
  })

  it('ship order test fails', async () => {
    await ship_order_fails.shipOrderFails(GET, POST, PATCH, DELETE, expect);
  })

  it('deliver order test succeds', async () => {
    await deliver_order_succeds.deliverOrderSucceds(GET, POST, PATCH, DELETE, expect);
  })

  it('deliver order test fails', async () => {
    await deliver_order_fails.deliverOrderFails(GET, POST, PATCH, DELETE, expect);
  })

})
