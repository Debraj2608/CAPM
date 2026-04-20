module.exports = async (results, request) => {
    if (results.status_code === null || results.status_code === undefined) {
        await UPDATE('my.bookshop.Orders').set({ status_code: 'INCART' }).where({ ID: results.ID });
        const orderIDLatest = await SELECT('orderNumber').from('my.bookshop.Orders').orderBy({ modifiedAt: 'desc' }).where({ orderNumber: { '!=': null } });
        let orderNumber = "";
        if(orderIDLatest.length == 0){
            orderNumber = "0001";
        } else {
            orderNumber = parseInt(orderIDLatest[0].orderNumber.match(/\d+/)[0]) + 1;
        }
        await UPDATE('my.bookshop.Orders').set({ orderNumber: 'ORD-' + orderNumber }).where({ ID: results.ID });
    }
    const orderItems = await SELECT.from('my.bookshop.OrderItems').where({ order_ID: results.ID });
    let totalPrice = 0;
    for (const item of orderItems) {
        const book = await SELECT.one('price').from('my.bookshop.Books').where({ ID: item.book_ID });
        await UPDATE('my.bookshop.OrderItems').set({ netprice: (book.price * item.quantity) }).where({ ID: item.ID });
        totalPrice = totalPrice + (book.price * item.quantity);
    }
    await UPDATE('my.bookshop.Orders').set({ totalPrice: totalPrice }).where({ ID: results.ID });
}