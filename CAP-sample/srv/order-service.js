const cds = require('@sap/cds');
const place_order = require('./code/place-order');
const create_update_handler = require('./code/create-update-handler');
const cancel_order = require('./code/cancel-order');
const download_PDF = require('./code/download-PDF');

class OrderService extends cds.ApplicationService {
    async init() {
        this.on('placeOrder', 'Orders', async (request) => {
            await place_order(request);
        });

        this.after(['CREATE', 'UPDATE'], 'Orders', async (result, request) => {
            await create_update_handler(result, request);
        });

        this.on('cancelOrder', 'Orders', async (request) => {
            await cancel_order(request);
        });

        this.on('downloadPDF', 'Orders', async(request) => {
            return download_PDF(request);
        })

        return super.init();
    }
}

module.exports = { OrderService };