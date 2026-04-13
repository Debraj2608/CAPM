namespace my.bookshop;

using {cuid, managed, sap.common.CodeList} from '@sap/cds/common';

using {Country} from '@sap/cds-common-content';

entity Books: cuid, managed {
  title : String @mandatory;
  author : String;
  price : Decimal(10,2) @mandatory;
  stock : Integer @mandatory;
  genre : Association to one Genres @mandatory;
  shortDescription : String @mandatory;
  rating : Decimal @assert.range:[1,5] @mandatory;
  orderItems : Association to many OrderItems on orderItems.book = $self;
}

entity Orders: cuid, managed {
  orderNumber : String @readonly;
  orderItems : Composition of many OrderItems on orderItems.order = $self;
  totalPrice : Decimal(10,2) @readonly;
  status : Association to one OrderStatus @readonly;
  address : String @mandatory;
  Country : Country @mandatory;
  contactNo : String(10) @assert.format: '^[0-9]{10}$' @mandatory;
  firstName : String @mandatory;
  lastName : String @mandatory;
  email : String @assert.format: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$' @Communication.IsEmailAddress @mandatory;
  orderlog : Composition of many OrderLogs on orderlog.order = $self;
}

entity OrderItems: cuid, managed {
  order : Association to one Orders;
  book : Association to one Books;@mandatory
  quantity : Integer;@mandatory
  netprice : Decimal(10,2);
}

entity OrderLogs: cuid, managed {
  order: Association to one Orders;
  status: Association to one OrderStatus;
  trackingInfo: String;
}

entity Genres: CodeList {
  key code : String;
  description : String;
  criticality : Integer;
}

entity OrderStatus: CodeList {
  key code : String;
  description : String;
  criticality : Integer;
}
