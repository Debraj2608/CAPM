sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"bookshop/createorders/test/integration/pages/OrdersList",
	"bookshop/createorders/test/integration/pages/OrdersObjectPage",
	"bookshop/createorders/test/integration/pages/OrderItemsObjectPage"
], function (JourneyRunner, OrdersList, OrdersObjectPage, OrderItemsObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('bookshop.createorders') + '/test/flp.html#app-preview',
        pages: {
			onTheOrdersList: OrdersList,
			onTheOrdersObjectPage: OrdersObjectPage,
			onTheOrderItemsObjectPage: OrderItemsObjectPage
        },
        async: true
    });

    return runner;
});

