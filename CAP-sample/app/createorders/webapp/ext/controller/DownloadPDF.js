sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        /**
         * Generated event handler.
         *
         * @param oContext the context of the page on which the event was fired. `undefined` for list report page.
         * @param aSelectedContexts the selected contexts of the table rows.
         */
        downloadPFDCustomAction: async function(oContext, aSelectedContexts) {
            console.log(oContext);
            const oOrder = oContext.getObject();
            console.log(oOrder);
            const orderID = oOrder.ID;
            console.log(orderID);
            const sFunctionPath = `/service/OrderService/Orders(ID=${orderID},IsActiveEntity=true)/downloadPDF()`;

            const oResponse = await fetch(sFunctionPath);
            const oResult = await oResponse.json();
            MessageToast.show("Custom handler invoked.");

        }
    };
});
