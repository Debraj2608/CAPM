const deliverOrder = async (request) =>{
    const orderID = request.params[0].ID;
    const orderStatus = await SELECT.one('status_code').from('my.bookshop.Orders').where({ID: orderID});
    if(orderStatus.status_code!== 'SHIPPED'){
        return request.error(500, 'You cannot deliver an order if the order is not in shipped status.');
    }
    const address = await SELECT.one('address').from('my.bookshop.Orders').where({ID: orderID});

    await UPDATE('my.bookshop.Orders').set({status_code: 'DELIVERED'}).where({ID: orderID});

    await INSERT.into('my.bookshop.OrderLogs').entries({
        status_code: 'DELIVERED',
        trackingInfo: `Order delivered to ${address.address}`,
        order_ID: orderID
    })
}

module.exports = deliverOrder;