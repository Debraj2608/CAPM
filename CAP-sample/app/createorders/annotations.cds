using OrderService as service from '../../srv/order-service';
using from '../../db/schema';
using from '@sap/cds/common';


annotate service.Orders with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : firstName,
                Label : '{i18n>YourFirstName}',
            },
            {
                $Type : 'UI.DataField',
                Value : contactNo,
                Label : '{i18n>YourPhoneNumber}',
            },
            {
                $Type : 'UI.DataField',
                Value : lastName,
                Label : 'Your Last Name',
            },
            {
                $Type : 'UI.DataField',
                Value : email,
                Label : '{i18n>YourEmailId}',
            },
            {
                $Type : 'UI.DataField',
                Value : address,
                Label : '{i18n>DeliveryAddress}',
            },
            {
                $Type : 'UI.DataField',
                Value : Country_code,
                Label : 'Country',
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>TotalPrice}',
                Value : totalPrice,
                ![@UI.Hidden]: { $edmJson: {$Ne: { $Path: 'IsActiveEntity' },false} }
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>Status}',
                Value : status_code,
                Criticality : status.criticality,
                CriticalityRepresentation : #WithoutIcon,
                ![@UI.Hidden]: { $edmJson: {$Ne: { $Path: 'IsActiveEntity' },false} }
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : '{i18n>DeliveryInformation}',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : '{i18n>OrderItems}',
            ID : 'OrderItems',
            Target : 'orderItems/@UI.LineItem#OrderItems',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Order Tracking',
            ID : 'OrderTracking',
            Target : 'orderlog/@UI.LineItem#OrderTracking',
            ![@UI.Hidden]: { $edmJson: {$Ne: { $Path: 'IsActiveEntity' },false} }
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : '{i18n>OrderNumber}',
            Value : orderNumber,
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>TotalPrice}',
            Value : totalPrice,
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>Status}',
            Value : status_code,
            Criticality : status.criticality,
            CriticalityRepresentation : #WithoutIcon,
        },
    ],
    UI.HeaderInfo : {
        Title : {
            $Type : 'UI.DataField',
            Value : orderNumber,
        },
        TypeName : '',
        TypeNamePlural : '',
    },
    UI.Identification : [
        {
            $Type : 'UI.DataFieldForAction',
            Action : 'OrderService.placeOrder',
            Label : 'Place Order',
            Criticality : #Positive,
            ![@UI.Hidden]: { $edmJson: {$Not: {$And: [
                {$Eq: [{ $Path: 'status_code'}, 'INCART']},{$Eq: { $Path: 'IsActiveEntity' },true}
            ]
            }}}
        },
        {
            $Type : 'UI.DataFieldForAction',
            Action : 'OrderService.cancelOrder',
            Label : '{i18n>CancelOrder}',
            Criticality: #Negative,
            ![@UI.Hidden]: { $edmJson: {$Not: {$Or: [
                {$Eq: [{ $Path: 'status_code'}, 'PLACED']}
            ]
            }}}
        },
        
    ],
    UI.UpdateHidden : { $edmJson: {$Not: {$Or: [
        {$Eq: [{ $Path: 'status_code'}, 'INCART']},
    ]} }},
    UI.DeleteHidden : { $edmJson: {$Not: {$Or: [
        {$Eq: [{Path: 'status_code'}, 'INCART']},
    ]} }},
    UI.SelectionFields : [
        status.name,
    ],
);

annotate service.Orders with {
    status @(
        Common.Text : status.name,
        Common.Text.@UI.TextArrangement : #TextOnly,
        )
};

annotate service.OrderStatus with {
    description @(
        Common.Text : descr,
        Common.Text.@UI.TextArrangement : #TextOnly,
    )
};

annotate service.Orders with {
    Country @(
        Common.Text : Country.name,
        Common.Text.@UI.TextArrangement : #TextOnly,
        Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'Countries',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : Country_code,
                    ValueListProperty : 'code',
                },
            ],
            Label : 'Country',
        },
        Common.ValueListWithFixedValues : true,
    )
};

annotate service.Countries with {
    code @(
        Common.Text : name,
        Common.Text.@UI.TextArrangement : #TextOnly,
)};

annotate service.Orders with {
    address @UI.MultiLineText : true
};

annotate service.OrderItems with @(
    UI.LineItem #OrderItems : [
        {
            $Type : 'UI.DataField',
            Value : book_ID,
            Label : '{i18n>Book}',
        },
        {
            $Type : 'UI.DataField',
            Value : quantity,
            Label : '{i18n>Quantity}',
        },
        {
            $Type : 'UI.DataField',
            Value : book.author,
            Label : '{i18n>Author}',
        },
        {
            $Type : 'UI.DataField',
            Value : book.genre.name,
            Label : '{i18n>Genre}',
        },
        {
            $Type : 'UI.DataField',
            Value : netprice,
            Label : '{i18n>NetPrice}',
        },
    ]
);

annotate service.OrderItems with {
    book @(
        Common.Text : book.title,
        Common.Text.@UI.TextArrangement : #TextOnly,
        Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'Books',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : book_ID,
                    ValueListProperty : 'ID',
                },
                {
                    $Type : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'author',
                },
                {
                    $Type : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'stock',
                },
                {
                    $Type : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'price',
                },
                {
                    $Type : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'genre/name',
                },
            ],
            Label : 'Book',
        },
        Common.ValueListWithFixedValues : false,
    )
};

annotate service.Books with {
    ID @(
        Common.Text : title,
        Common.Text.@UI.TextArrangement : #TextOnly,
        Common.Label: 'Book'
)};

annotate service.Books with {
    author @(
        Common.Label: 'Author')
};

annotate service.Books with {
    price @(
        Common.Label: 'Price');
    stock @(
        Common.Label: 'Available Units');
};

annotate service.Genres with {
    name @(
        Common.FieldControl : #ReadOnly,
        Common.Label: 'Genre'
)};

annotate service.OrderItems with {
    netprice @Common.FieldControl : #ReadOnly
};

annotate service.OrderItems with {
    book @mandatory : true
};

annotate service.OrderItems with {
    quantity @(
        Common.Label: 'Quantity',
        Common.QuickInfo: 'Cannot exceed book stock'
    )
};
annotate service.OrderLogs with @(
    UI.LineItem #OrderTracking : [
        {
            $Type : 'UI.DataField',
            Value : status_code,
            Label : '{i18n>Status}',
            Criticality : status.criticality,
            CriticalityRepresentation : #WithoutIcon,
        },
        {
            $Type : 'UI.DataField',
            Value : trackingInfo,
            Label : '{i18n>TrackingInformation}',
        },
        {
            $Type : 'UI.DataField',
            Value : createdAt,
            Label : '{i18n>UpdatedOn}',
        },
    ]
);

annotate service.OrderLogs with {
    status @(
        Common.Text : status.name,
        Common.Text.@UI.TextArrangement : #TextOnly,
    )
};

annotate service.OrderStatus with {
    name @(
        Common.Label : '{i18n>Status}',
        Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'OrderStatus',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : name,
                    ValueListProperty : 'name',
                },
            ],
            Label : 'Status',
        },
        Common.ValueListWithFixedValues : true,
    )
};

