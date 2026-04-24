const deliverOrder = async (request) =>{
    const orderID = request.params[0].ID;

    const address = await SELECT.one('address').from('my.bookshop.Orders').where({ID: orderID});

    const affectedRows = await UPDATE('my.bookshop.Orders').set({status_code: 'DELIVERED'}).where({ID: orderID, status_code: 'SHIPPED'});

    if (affectedRows === 0) {
        return request.error(500, 'You cannot deliver an order if the order is not in shipped status.');
    }

    await INSERT.into('my.bookshop.OrderLogs').entries({
        status_code: 'DELIVERED',
        trackingInfo: `Order delivered to ${address.address}`,
        order_ID: orderID
    })
}

module.exports = deliverOrder;