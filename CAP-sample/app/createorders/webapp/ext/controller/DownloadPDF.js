sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        /**
         * Custom Action to Download PDF
         */
        downloadPFDCustomAction: async function(oContext, aSelectedContexts) {
            // 1. Get Order Data
            const oOrder = oContext.getObject();
            const orderID = oOrder.ID;
            const orderNumber = oOrder.orderNumber || "Order";

            // Get the service base path from the model
            const oModel = oContext.getModel();
            const sServiceUrl = oModel.getServiceUrl(); 
            // sServiceUrl will look like ".../service/OrderService/" 

            // Construct the URL using the base path
            const sFunctionPath = `${sServiceUrl}Orders(ID=${orderID},IsActiveEntity=true)/downloadPDF()`;
            
            // 2. Define the Function URL
            // Note: Ensure your service name and bound action path are correct
            //const sFunctionPath = `/service/OrderService/Orders(ID=${orderID},IsActiveEntity=true)/downloadPDF()`;

            try {
                // 3. Trigger the fetch request
                const oResponse = await fetch(sFunctionPath);

                if (!oResponse.ok) {
                    console.log(`HTTP error! status: ${oResponse.status}`)
                    MessageToast.show(`HTTP error! status: ${oResponse.status}`);
                }

                // 4. CRITICAL: Get the response as a Blob, NOT JSON
                const oBlob = await oResponse.blob();

                // 5. Create a local URL for the Blob
                const sBlobURL = window.URL.createObjectURL(oBlob);
                const sFileName = `${orderNumber}.pdf`;

                // 6. Handle Download or Preview
                const bPreviewOnly = false; // Set to true if you want to open in new tab

                if (bPreviewOnly) {
                    window.open(sBlobURL, "_blank");
                } else {
                    const oLink = document.createElement("a");
                    oLink.href = sBlobURL;
                    oLink.download = sFileName;
                    document.body.appendChild(oLink); // Required for Firefox
                    oLink.click();
                    document.body.removeChild(oLink);
                }

                // Clean up the URL object to free memory
                setTimeout(() => window.URL.revokeObjectURL(sBlobURL), 100);

                MessageToast.show("PDF generated successfully.");

            } catch (oError) {
                console.error("PDF Download failed:", oError);
                MessageToast.show("Failed to generate PDF. Please check after some time.");
            }
        }
    };
});