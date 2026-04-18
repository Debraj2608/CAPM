const shipOrder = async (request) => {
    const orderID = request.params[0].ID;
    const orderStatus = await SELECT.one('status_code').from('my.bookshop.Orders').where({ID: orderID});
    if(orderStatus.status_code!== 'CONFIRMED'){
        return request.error(500, 'You cannot ship an order if the order is not in confirmed status.');
    }

    const trackingInfo = request.data.trackingInfo;

    await UPDATE('my.bookshop.Orders').set({status_code: 'SHIPPED'}).where({ID: orderID});

    await INSERT.into('my.bookshop.OrderLogs').entries({
        order_ID: orderID,
        trackingInfo: trackingInfo,
        status_code: 'SHIPPED'
    });

}

module.exports = shipOrder;