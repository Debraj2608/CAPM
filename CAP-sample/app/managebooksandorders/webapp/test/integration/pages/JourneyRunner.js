sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"bookshop/managebooksandorders/test/integration/pages/BooksList",
	"bookshop/managebooksandorders/test/integration/pages/BooksObjectPage"
], function (JourneyRunner, BooksList, BooksObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('bookshop.managebooksandorders') + '/test/flp.html#app-preview',
        pages: {
			onTheBooksList: BooksList,
			onTheBooksObjectPage: BooksObjectPage
        },
        async: true
    });

    return runner;
});

