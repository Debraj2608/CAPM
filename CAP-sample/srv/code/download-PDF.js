const path = require('path');
const PDFDocument = require('pdfkit');

const downloadPDF = async function (request) {
    const requestID = request.params[0].ID;
    
    // Fetch Order details
    const orderDetails = await SELECT.one.from('my.bookshop.Orders').where({ ID: requestID });
    if (!orderDetails) request.error(404, 'Order not found.');

    const {
        firstName,
        lastName,
        email,
        totalPrice,
        address,
        Country_code,
        contactNo,
        orderNumber
    } = orderDetails;

    // Fetch Order Items and join with Books to get the Title
    const orderItems = await SELECT.from('my.bookshop.OrderItems')
        .columns('quantity', 'netprice', 'book.title as bookTitle')
        .where({ order_ID: orderDetails.ID });

    const pdfBuffer = await new Promise((resolve, reject) => {
        const doc = new PDFDocument({
            size: 'A4',
            margins: { top: 50, bottom: 50, left: 50, right: 50 },
        });
        const chunks = [];

        doc.on('data', chunk => chunks.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(chunks)));
        doc.on('error', reject);

        // Header Image/Logo area
        try {
            const imagePath = path.join(__dirname, '..', 'templates', 'Bookshop-PDF-image.png');
            doc.image(imagePath, 0, 0, { width: 595 }); // Width of A4 is 595 points
        } catch (e) {
            console.error("Header image not found, skipping...");
        }

        doc.moveDown(14);

        // --- Document Title ---
        doc.fillColor('#2c3e50')
           .fontSize(20)
           .text('ORDER INVOICE', { align: 'right' });
        
        doc.fontSize(10)
           .fillColor('#7f8c8d')
           .text(`Order Reference: ${orderNumber || requestID}`, { align: 'right' })

        //doc.moveDown(1);

        // --- Customer Information ---
        doc.fillColor('#000000').fontSize(12).text('BILL TO:', { underline: true });
        doc.fontSize(11).text(`${firstName} ${lastName}`);
        doc.text(address);
        doc.text(`${Country_code}`);
        doc.text(`Contact: ${contactNo}`);
        doc.text(`Email: ${email}`);

        doc.moveDown(5);

        // --- Table Header ---
        const tableTop = 400;
        const itemCol = 50;
        const qtyCol = 350;
        const priceCol = 450;

        doc.fillColor('#2c3e50').fontSize(11);
        doc.text('Book Description', itemCol, tableTop, { bold: true });
        doc.text('Quantity', qtyCol, tableTop);
        doc.text('Amount', priceCol, tableTop, { align: 'right', width: 90 });

        // Horizontal Line
        doc.moveTo(50, tableTop + 15).lineTo(550, tableTop + 15).strokeColor('#bdc3c7').stroke();

        // --- Table Items ---
        let currentY = tableTop + 25;
        doc.fillColor('#333333');

        orderItems.forEach((item) => {
            doc.text(item.bookTitle || 'Unknown Book', itemCol, currentY);
            doc.text(item.quantity.toString(), qtyCol, currentY);
            doc.text(`€${Number(item.netprice).toFixed(2)}`, priceCol, currentY, { align: 'right', width: 90 });
            
            currentY += 20;
            // Draw a light line between items
            doc.moveTo(50, currentY - 5).lineTo(550, currentY - 5).strokeColor('#ecf0f1').stroke();
        });

        // --- Totals Section ---
        doc.moveDown(2);
        const footerY = currentY + 20;
        
        doc.moveTo(350, footerY).lineTo(550, footerY).strokeColor('#2c3e50').stroke();
        
        doc.fontSize(12).fillColor('#2c3e50')
           .text('Total Amount Due:', 350, footerY + 10)
           .text(`€${Number(totalPrice).toFixed(2)}`, priceCol, footerY + 10, { align: 'right', width: 90 });

        // --- Footer Message ---
        doc.fontSize(10).fillColor('#7f8c8d')
           .text('Thank you for shopping with our Bookshop!', 50, 750, { align: 'center', width: 495 });

        doc.end();
    });

    const fileName = `Invoice_${orderNumber || requestID}.pdf`;
    const response = request.http?.res || request._?.res;
    if (response) {
        response.setHeader('Content-Type', 'application/pdf');
        response.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
        response.end(pdfBuffer);
        return;
    }

    return pdfBuffer;
}

module.exports = downloadPDF;