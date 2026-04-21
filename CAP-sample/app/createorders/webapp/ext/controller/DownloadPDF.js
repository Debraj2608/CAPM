sap.ui.define([
    "sap/m/MessageToast"
], function (MessageToast) {
    'use strict';

    return {
        /**
         * Custom Action to Download PDF
         */
        downloadPFDCustomAction: async function (oContext, aSelectedContexts) {
            // 1. Get Order Data
            MessageToast.show('downloading...')
            const oOrder = oContext.getObject();
            const orderID = oOrder.ID;
            const orderNumber = oOrder.orderNumber || "Order";
            const oModel = oContext.getModel();
            const sServiceUrl = oModel.getServiceUrl();
            // Construct the URL using the base path
            const sFunctionPath = `${sServiceUrl}Orders(ID=${orderID},IsActiveEntity=true)/downloadPDF()`;
            const oResponse = await fetch(sFunctionPath);
            const oResult = await oResponse.json();
            const binaryString = oResult.value;
            const fileName = `${orderNumber}`;
            const fileType = "application/pdf";
            const isPreviewOnly = false;
            const byteArray = Uint8Array.from(atob(binaryString), (c) =>
                c.charCodeAt(0),
            );
            const blob = new Blob([byteArray], { type: fileType });
            const blobUrl = URL.createObjectURL(blob);
            if (isPreviewOnly) {
                window.open(blobUrl, "_blank")
            } else {
                const link = document.createElement("a");
                link.href = blobUrl;
                link.download = fileName;
                link.click()
            }

            MessageToast.show('PDF downloaded!');

        }
    };
});