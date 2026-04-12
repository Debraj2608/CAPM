const cds = require('@sap/cds');
const place_order = require('./code/place-order');
const create_update_handler = require('./code/create-update-handler');

class OrderService extends cds.ApplicationService {
    async init() {
        this.on('placeOrder', 'Orders', async (request) => {
            await place_order(request);
        });

        this.after(['CREATE', 'UPDATE'], 'Orders', async (result, request) => {
            await create_update_handler(result, request);
        });

        return super.init();
    }
}

module.exports = { OrderService };