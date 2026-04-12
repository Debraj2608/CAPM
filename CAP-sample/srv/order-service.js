const cds = require('@sap/cds');
const place_order = require('./code/place-order');

class OrderService extends cds.ApplicationService {
    async init() {
        this.on('placeOrder', 'Orders', async (request) => {
            await place_order(request);
        });

        return super.init();
    }
}

module.exports = { OrderService };