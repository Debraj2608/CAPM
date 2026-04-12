const placeOrder = async (request) => {
    const requestID = request.params[0].ID;
    const orderItems = await SELECT.from('my.bookshop.OrderItems').where({ order_ID: requestID });
    if (orderItems.length === 0) {
        request.error(500, 'You cannot place an order without adding the required books.');
        return;
    } else {
        await UPDATE('my.bookshop.Orders').set({ status_code: 'PLACED' }).where({ ID: requestID });
        return
    }
}

module.exports = placeOrder;