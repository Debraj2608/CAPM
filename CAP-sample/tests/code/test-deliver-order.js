const cds = require('@sap/cds');
const { uuid } = cds.utils;

async function deliverOrderSucceds(GET, POST, PATCH, DELETE, expect){
    //Arrange
    const order = {
    ID: uuid(),
    orderNumber: "ORD-1099",
    totalPrice: 10.99,
    address: "123 Main St, New York, NY 10001",
    Country_code: "US",
    contactNo: "2125551234",
    firstName: "John",
    status_code: 'SHIPPED',
    lastName: "Smith",
    email: "john.smith@example.com",
    orderItems_ID: uuid()
  }

  await INSERT.into('my.bookshop.Orders').entries(order);

  //Act
  await POST(
    `/service/CatalogService/Orders(ID=${order.ID},IsActiveEntity=true)/CatalogService.deliverOrder`,
    {},
    {
        withCredentials: true,
        auth: {username: "admin", password: "admin"}
    }
  )

  //Assert
  const orderDetails = await SELECT.one.from('my.bookshop.Orders').where({ID: order.ID});
  expect(orderDetails.status_code).to.be.equal('DELIVERED');
}

async function deliverOrderFails(GET, POST, PATCH, DELETE, expect){
    //Arrange
    const order = {
    ID: uuid(),
    orderNumber: "ORD-1099",
    totalPrice: 10.99,
    address: "123 Main St, New York, NY 10001",
    Country_code: "US",
    contactNo: "2125551234",
    firstName: "John",
    status_code: 'CONFIRMED',
    lastName: "Smith",
    email: "john.smith@example.com",
    orderItems_ID: uuid()
  }

  await INSERT.into('my.bookshop.Orders').entries(order);

  //Act and Assert
  await expect(
    POST(
        `/service/CatalogService/Orders(ID=${order.ID},IsActiveEntity=true)/CatalogService.deliverOrder`,
        {},
        {
          withCredentials: true,
          auth: {username: "admin", password: "admin"}
        }
    )
  ).to.be.rejectedWith(/You cannot deliver an order if the order is not in shipped status./i)
}

module.exports = { deliverOrderSucceds,deliverOrderFails };