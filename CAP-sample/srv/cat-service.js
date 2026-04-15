const cds = require('@sap/cds');
const confirmOrder = require('./code/confirm-order');
const shipOrder = require('./code/ship-order');
const deliverOrder = require('./code/deliver-order');

class CatalogService extends cds.ApplicationService {
    async init(){

        this.on('confirmOrder', 'Orders', async (request) => {
            await confirmOrder(request);
        });

        this.on('shipOrder', 'Orders', async (request) => {
            await shipOrder(request);
        });

        this.on('deliverOrder', 'Orders', async (request) => {
            await deliverOrder(request);
        })

        return super.init();
    }
}

module.exports = {CatalogService};