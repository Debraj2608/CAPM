using my.bookshop as db from '../db/schema';

@path : '/service/OrderService'
service OrderService {
    @odata.draft.enabled : true
    entity Orders as projection on db.Orders
    actions {
        @cds.odata.BindingParameter.name: 'Orders'
        @Common.IsActionCritical
        @Common.SideEffects:
        {
            TargetProperties: ['status_code'],
            TargetEntities : ['Orders'],
        }
        action placeOrder ();
    };

    @readonly
    entity Books as projection on db.Books{
        *,
    } where stock > 0;

    @readonly
    entity OrderLogs as projection on db.OrderLogs;

    entity OrderItems as projection on db.OrderItems;
}

annotate OrderService with @requires : ['User'];