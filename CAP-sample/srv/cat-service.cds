using my.bookshop as db from '../db/schema';

@path : '/service/CatalogService'
service CatalogService {
    entity Books as projection on db.Books;
}