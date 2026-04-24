const shipOrder = async (request) => {
    const orderID = request.params[0].ID;
    const affectedRows = await UPDATE('my.bookshop.Orders').set({status_code: 'SHIPPED'}).where({ID: orderID, status_code: 'CONFIRMED'});

    if (affectedRows === 0) {
        return request.error(500, 'You cannot ship an order if the order is not in confirmed status.');
    }

    const trackingInfo = request.data.trackingInfo;

    await INSERT.into('my.bookshop.OrderLogs').entries({
        order_ID: orderID,
        trackingInfo: trackingInfo,
        status_code: 'SHIPPED'
    });
}

module.exports = shipOrder;