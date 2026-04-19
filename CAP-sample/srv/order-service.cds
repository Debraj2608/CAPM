using my.bookshop as db from '../db/schema';

@path : '/service/OrderService'
service OrderService {

    annotate Orders with @restrict :
    [
        {
            grant : ['CREATE', 'UPDATE', 'READ', 'placeOrder', 'cancelOrder'], 
            to: ['User'], 
            where : 'createdBy = $user'
        },
        {
            grant : [ 'READ' ],
            to: [ 'Admin' ]
        }
    ];    

    @odata.draft.enabled : true
    entity Orders as projection on db.Orders {
        *,
    } where $user = createdBy
    actions {
        @cds.odata.BindingParameter.name: 'Orders'
        @Common.IsActionCritical
        @Common.SideEffects:
        {
            TargetProperties: ['status_code', 'orderlog'],
            TargetEntities : ['Orders'],
        }
        action placeOrder ();

        @Common.IsActionCritical
        @Common.SideEffects:
        {
            TargetProperties: ['status_code', 'orderlog'],
            TargetEntities : ['Orders'],
        }
        action cancelOrder();

        function downloadPDF()
            returns LargeBinary;
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
