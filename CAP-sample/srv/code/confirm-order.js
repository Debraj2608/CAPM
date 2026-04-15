const confirmOrder = async (request) =>{
    const orderID = request.params[0].ID;

    await UPDATE('my.bookshop.Orders').set({status_code: 'CONFIRMED'}).where({ID: orderID});

    await INSERT.into('my.bookshop.OrderLogs').entries({
        order_ID: orderID,
        trackingInfo: "Order is confirmed",
        status_code: 'CONFIRMED'
    })

}

module.exports = confirmOrder;