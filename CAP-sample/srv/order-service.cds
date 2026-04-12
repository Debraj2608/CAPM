using my.bookshop as db from '../db/schema';

@path : '/service/OrderService'
service OrderService {
    @odata.draft.enabled : true
    entity Orders as projection on db.Orders
    actions {
        @Common.IsActionCritical : true
        action placeOrder ();
    };
    @readonly
    entity Books as projection on db.Books;

    entity OrderItems as projection on db.OrderItems;
}

annotate OrderService with @requires : ['User'];