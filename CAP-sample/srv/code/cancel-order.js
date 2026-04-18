const { SELECT } = require("@sap/cds/lib/ql/cds-ql");

const cancelOrder = async (request) => {
    const orderID = request.params[0].ID;
    const orderStatus = await SELECT.one('status_code').from('my.bookshop.Orders').where({ID: orderID});
    if(orderStatus.status_code!== 'PLACED'){
        return request.error(500, 'You cannot cancel an order if the order is not in placed status.');
    }
    const orderItems = await SELECT.from('my.bookshop.OrderItems').where({order_ID: orderID});
    const books_ID = orderItems.map(book => book.book_ID);
    const books = await SELECT.from('my.bookshop.Books').where({ID: {in: books_ID}}).forUpdate();

    for(item of orderItems){
        const book = books.find(b => b.ID === item.book_ID);
        await UPDATE('my.bookshop.Books').set({stock: book.stock + item.quantity}).where({ID: item.book_ID});
    }

    await INSERT.into('my.bookshop.OrderLogs').entries({
        order_ID: orderID,
        trackingInfo: 'Order cancelled by User',
        status_code: 'CANCELLED'
    });

    await UPDATE('my.bookshop.Orders').set({status_code: 'CANCELLED'}).where({ID: orderID});
}

module.exports = cancelOrder;