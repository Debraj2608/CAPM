namespace my.bookshop;

using {cuid, managed, sap.common.CodeList} from '@sap/cds/common';

entity Books: cuid, managed {
  title : String;
  author : String;
  price : Decimal(10,2);
  stock : Integer;
  genre : Association to one Genres;
  shortDescription : String;
  rating : Integer @assert.range:[1,5];
}

entity Orders: cuid, managed {
  orderNumber : String;
  orderItems : Composition of many OrderItems on orderItems.order = $self;
  totalPrice : Decimal(10,2);
  status : Association to one OrderStatus;
  address : String;
  contactNo: Integer @assert.format: '^[0-9]{10}$';
  firstName : String;
  lastName : String;
}

entity OrderItems: cuid, managed {
  order : Association to one Orders;
  book : Association to one Books;
  quantity : Integer;
  netprice : Decimal(10,2);
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