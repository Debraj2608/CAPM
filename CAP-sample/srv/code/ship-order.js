const shipOrder = async (request) => {
    const orderID = request.params[0].ID;
    const trackingInfo = request.data.trackingInfo;

    await UPDATE('my.bookshop.Orders').set({status_code: 'SHIPPED'}).where({ID: orderID});

    await INSERT.into('my.bookshop.OrderLogs').entries({
        order_ID: orderID,
        trackingInfo: trackingInfo,
        status_code: 'SHIPPED'
    });

}

module.exports = shipOrder;