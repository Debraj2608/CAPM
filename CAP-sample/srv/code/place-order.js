const placeOrder = async(request) => {
    const requestID = request.params[0].ID;

    await UPDATE('my.bookshop.Orders').set({status_code: 'PLACED'}).where({ ID: requestID });
    return
}

module.exports = placeOrder;