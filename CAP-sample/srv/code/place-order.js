const placeOrder = async (request) => {
    const requestID = request.params[0].ID; // Get the order ID from the request parameters
    const orderItems = await SELECT.from('my.bookshop.OrderItems').where({ order_ID: requestID }); // Fetch the order items associated with the order ID
    if (orderItems.length === 0) {
        return request.error(500, 'You cannot place an order without adding atleast one book.');
    }
    const bookIDs = orderItems.map(item => item.book_ID); // Extract the book IDs from the order items
    const bookDetails = await SELECT.from('my.bookshop.Books').where({ID:{ in: bookIDs }}).forUpdate(); // Fetch the book details for the associated book IDs with a lock for update to prevent concurrent modifications (Prevent race conditions)
    
    for (const items of orderItems){
        const book = bookDetails.find(b => b.ID === items.book_ID) // Find the corresponding book details for each order item
        if (book.stock < items.quantity) {
            request.error(500, `Not enough stock available for book: ${book.title}. Maxumum available quantity is ${book.stock}. Please reduce the quantity and try again.`);
            return;
        }
    }

    for (const items of orderItems){
        const book = bookDetails.find(b => b.ID === items.book_ID);
        await UPDATE('my.bookshop.Books').set({ stock: book.stock - items.quantity }).where({ ID: items.book_ID });
    }

    await UPDATE('my.bookshop.Orders').set({ status_code: 'PLACED' }).where({ ID: requestID });
    await INSERT.into('my.bookshop.OrderLogs').entries({
        order_ID: requestID,
        trackingInfo: "Order Placed",
        status_code: 'PLACED'
    })
    return
    
}

module.exports = placeOrder;