const cds = require('@sap/cds');
const confirmOrder = require('./code/confirm-order');

class CatalogService extends cds.ApplicationService {
    async init(){

        this.on('confirmOrder', 'Orders', async (request) => {
            await confirmOrder(request);
        })

        return super.init();
    }
}

module.exports = {CatalogService};