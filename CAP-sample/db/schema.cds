namespace my.bookshop;

entity Books {
  key ID : UUID;
  title : String;
  author : String;
  price : Decimal(10,2);
  stock : Integer;
}