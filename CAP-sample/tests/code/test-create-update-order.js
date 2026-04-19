const cds = require('@sap/cds');
const { uuid } = cds.utils;

async function createOrderSucceds(GET, POST, PATCH, DELETE, expect) {
    //Arrange
    const order = {
    ID: uuid(),
    address: "123 Main St, New York, NY 10001",
    Country_code: "US",
    contactNo: "2125551234",
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@example.com",
  }

  const orderItems = {
    ID: uuid(),
    order_ID: order.ID,
    book_ID: uuid(),
    quantity: 1,
    netprice: 10.99,
  }

  //Act
  cds.env.fiori.bypass_draft = true;
  cds.env.fiori.direct_crud = true;
  await POST('/service/OrderService/Orders', order, 
    {
        withCredentials: true,
        auth: {username: "admin", password: "admin"},
    });

  //Assert
  const orderStatus = await SELECT.one.from('my.bookshop.Orders').where({ID: order.ID});
  expect(orderStatus.status_code).to.equal('INCART');
}

module.exports = {createOrderSucceds};
