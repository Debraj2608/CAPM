using my.bookshop as db from '../db/schema';

@path : '/service/OrderService'
service OrderService {
    @odata.draft.enabled : true
    entity Orders as projection on db.Orders;
}

annotate OrderService with @requires : ['User'];