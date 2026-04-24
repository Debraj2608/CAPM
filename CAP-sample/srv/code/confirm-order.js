const confirmOrder = async (request) =>{
    const orderID = request.params[0].ID;
    const affectedRows = await UPDATE('my.bookshop.Orders').set({status_code: 'CONFIRMED'}).where({ID: orderID, status_code: 'PLACED'});

    if (affectedRows === 0) {
        return request.error(500, 'You cannot confirm an order if the order is not in placed status.');
    }

    await INSERT.into('my.bookshop.OrderLogs').entries({
        order_ID: orderID,
        trackingInfo: "Order is confirmed",
        status_code: 'CONFIRMED'
    })
}

module.exports = confirmOrder;