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
}

annotate CatalogService with @requires : ['Admin'];