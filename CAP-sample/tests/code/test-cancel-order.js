const cds = require('@sap/cds');
const {uuid} = cds.utils;

async function cancelOrderSucceds(GET, POST, PATCH, DELETE, expect) {
    //Arrange
    const order = {
      ID: uuid(),
      orderNumber: "ORD-1099",
      totalPrice: 10.99,
      address: "123 Main St, New York, NY 10001",
      Country_code: "US",
      status_code: 'PLACED',
      contactNo: "2125551234",
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@example.com",
    }

    const orderItems = {
      ID: uuid(),
      order_ID: order.ID,
      book_ID: "550e8400-e29b-41d4-a716-446655440000",
      quantity: 1,
      netprice: 10.99,
    }

    await INSERT.into('my.bookshop.OrderItems').entries(orderItems);
    await INSERT.into('my.bookshop.Orders').entries(order);

    //Act
    await POST (
        `/service/OrderService/Orders(ID=${order.ID},IsActiveEntity=true)/OrderService.cancelOrder`,
        {},
        {
            withCredentials: true,
            auth: {username: "admin", password: "admin"},
        }
    )

    //Assert
    const placedOrder = await SELECT.one.from('my.bookshop.Orders').where({ID: order.ID});
    expect(placedOrder.status_code).to.equal('CANCELLED');
}

async function cancelOrderFails(GET, POST, PATCH, DELETE, expect) {
    //Arrange
    const order = {
      ID: uuid(),
      orderNumber: "ORD-1099",
      totalPrice: 10.99,
      address: "123 Main St, New York, NY 10001",
      Country_code: "US",
      status_code: 'SHIPPED',
      contactNo: "2125551234",
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@example.com",
    }

    const orderItems = {
      ID: uuid(),
      order_ID: order.ID,
      book_ID: "550e8400-e29b-41d4-a716-446655440000",
      quantity: 1,
      netprice: 10.99,
    }

    await INSERT.into('my.bookshop.OrderItems').entries(orderItems);
    await INSERT.into('my.bookshop.Orders').entries(order);

    //Act and Assert
    await expect(
    POST (
        `/service/OrderService/Orders(ID=${order.ID},IsActiveEntity=true)/OrderService.cancelOrder`,
        {},
        {
            withCredentials: true,
            auth: {username: "admin", password: "admin"},
        }
      )
    ).to.be.rejectedWith(/You cannot cancel an order after the order is not in placed status./i)
}

module.exports = {cancelOrderSucceds, cancelOrderFails}