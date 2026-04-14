using my.bookshop as db from '../db/schema';

@path : '/service/CatalogService'
service CatalogService {

    annotate CatalogService.Books with @restrict : [
        {
            grant: '*',
            to : 'Admin'
        }
    ];

    @odata.draft.enabled : true
    entity Books as projection on db.Books;

    @readonly
    entity Orders as projection on db.Orders
    actions{
        @Common.IsActionCritical
        @Common.SideEffects:
        {
            TargetProperties: ['status_code', 'orderlog'],
            TargetEntities: ['Orders']
        }
        action confirmOrder();
    };
}

annotate CatalogService with @requires : ['Admin'];