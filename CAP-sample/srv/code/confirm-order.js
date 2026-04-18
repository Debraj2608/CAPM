const confirmOrder = async (request) =>{
    const orderID = request.params[0].ID;
    const orderStatus = await SELECT.one('status_code').from('my.bookshop.Orders').where({ID: orderID});
    if(orderStatus.status_code!== 'PLACED'){
        return request.error(500, 'You cannot confirm an order if the order is not in placed status.');
    }
    await UPDATE('my.bookshop.Orders').set({status_code: 'CONFIRMED'}).where({ID: orderID});

    await INSERT.into('my.bookshop.OrderLogs').entries({
        order_ID: orderID,
        trackingInfo: "Order is confirmed",
        status_code: 'CONFIRMED'
    })

}

module.exports = confirmOrder;