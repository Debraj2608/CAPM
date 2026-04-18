using CatalogService as service from '../../srv/cat-service';
using from '../../db/schema';

annotate service.Books with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : '{i18n>Title}',
                Value : title,
                ![@UI.Hidden]: { $edmJson: { $Path: 'IsActiveEntity' } }
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>Author}',
                Value : author,
            },
            {
                $Type : 'UI.DataField',
                Value : rating,
                Label : '{i18n>Rating}',
                ![@UI.Hidden]: { $edmJson: { $Path: 'IsActiveEntity' } }
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'About',
            ID : 'Aboutthebook',
            Target : '@UI.FieldGroup#Aboutthebook',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Inventory Info',
            ID : 'InventoryInfo',
            Target : '@UI.FieldGroup#InventoryInfo',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : '{i18n>Title}',
            Value : title,
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>Author}',
            Value : author,
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>Price}',
            Value : price,
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>Stock}',
            Value : stock,
        },
        {
            $Type : 'UI.DataFieldForAnnotation',
            Target : '@UI.DataPoint#rating1',
            Label : 'Rating',
        },
    ],
    UI.HeaderInfo : {
        Title : {
            $Type : 'UI.DataField',
            Value : title,
        },
        TypeName : '',
        TypeNamePlural : '',
    },
    UI.FieldGroup #Aboutthebook : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : genre_code,
                Label : '{i18n>Genre}',
            },
            {
                $Type : 'UI.DataField',
                Value : shortDescription,
                Label : '{i18n>Description}',
            },
        ],
    },
    UI.FieldGroup #InventoryInfo : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : price,
                Label : '{i18n>Price}',
            },
            {
                $Type : 'UI.DataField',
                Value : stock,
                Label : '{i18n>Stock}',
            },
        ],
    },
    UI.HeaderFacets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'rating',
            Target : '@UI.DataPoint#rating',
            ![@UI.Hidden]: { $edmJson: {$Ne: { $Path: 'IsActiveEntity'},false}}
        },
    ],
    UI.DataPoint #rating : {
        $Type : 'UI.DataPointType',
        Value : rating,
        Title : '{i18n>Rating}',
        Visualization : #Rating,
    },
    UI.DataPoint #rating1 : {
        Value : rating,
        Visualization : #Rating,
        TargetValue : 5,
    },
    UI.SelectionPresentationVariant #tableView : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
            ],
        },
        Text : '{i18n>BooksInventory}',
    },
    UI.LineItem #tableView : [
    ],
);

annotate service.Books with {
    genre @(
        Common.Text : genre.name,
        Common.Text.@UI.TextArrangement : #TextOnly,
        Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'Genres',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : genre_code,
                    ValueListProperty : 'code',
                },
            ],
            Label : 'Genre',
        },
        Common.ValueListWithFixedValues : true,
    )
};

annotate service.Genres with {
    code @(
        Common.Text : name,
        Common.Text.@UI.TextArrangement : #TextOnly,
)};

annotate service.Books with {
    shortDescription @UI.MultiLineText : true
};

annotate service.Books with {
    author @mandatory : true
}
annotate service.Orders with @(
    UI.LineItem #tableView : [
        {
            $Type : 'UI.DataField',
            Value : orderNumber,
            Label : '{i18n>OrderNumber}',
        },
        {
            $Type : 'UI.DataField',
            Value : totalPrice,
            Label : '{i18n>TotalOrderPrice}',
        },
        {
            $Type : 'UI.DataField',
            Value : status_code,
            Label : '{i18n>Status}',
            Criticality : status.criticality,
            CriticalityRepresentation : #WithoutIcon,
        },
    ],
    UI.SelectionPresentationVariant #tableView : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem#tableView',
            ],
            GroupBy : [
                status.name,
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
            ],
        },
        Text : '{i18n>ManageOrders}',
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : '{i18n>DeliveryInformation}',
            ID : 'i18nDeliveryInformation',
            Target : '@UI.FieldGroup#i18nDeliveryInformation',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : '{i18n>OrderedItems}',
            ID : 'i18nOrderedItems',
            Target : 'orderItems/@UI.LineItem#i18nOrderedItems',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Order Log',
            ID : 'OrderLog',
            Target : 'orderlog/@UI.LineItem#OrderLog',
        },
    ],
    UI.FieldGroup #i18nDeliveryInformation : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : firstName,
                Label : '{i18n>FirstName}',
            },
            {
                $Type : 'UI.DataField',
                Value : contactNo,
                Label : '{i18n>PhoneNumber}',
            },
            {
                $Type : 'UI.DataField',
                Value : lastName,
                Label : '{i18n>LastName}',
            },
            {
                $Type : 'UI.DataField',
                Value : email,
                Label : '{i18n>EmailId}',
            },
            {
                $Type : 'UI.DataField',
                Value : address,
                Label : '{i18n>DeliveryAddress}',
            },
            {
                $Type : 'UI.DataField',
                Value : Country_code,
            },
            {
                $Type : 'UI.DataField',
                Value : totalPrice,
                Label : '{i18n>TotalOrderPrice}',
            },
            {
                $Type : 'UI.DataField',
                Value : status_code,
                Label : '{i18n>OrderStatus}',
                Criticality : status.criticality,
                CriticalityRepresentation : #WithoutIcon,
            },
        ],
    },
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
            Action : 'CatalogService.confirmOrder',
            Label : '{i18n>ConfirmOrder}',
            Criticality : #Positive,
            ![@UI.Hidden]: { $edmJson: {
                $Ne: [
                    { $Path: 'status_code'},
                    'PLACED'
                    ]
            }}
        },
        {
            $Type : 'UI.DataFieldForAction',
            Action : 'CatalogService.shipOrder',
            Label : '{i18n>ShipOrder}',
            Criticality : #Positive,
            ![@UI.Hidden]: { $edmJson: {
                $Ne: [
                    { $Path: 'status_code'},
                    'CONFIRMED'
                    ]
            }}
        },
        {
            $Type : 'UI.DataFieldForAction',
            Action : 'CatalogService.deliverOrder',
            Label : '{i18n>DeliverOrder}',
            Criticality : #Positive,
            ![@UI.Hidden]: {$edmJson: {
                $Ne: [
                    {$Path: 'status_code'},
                    'SHIPPED'
                ]
            }}
        },
    ],
);

annotate service.Orders with {
    status @(
        Common.Label : '',
        Common.Text : status.name,
        Common.Text.@UI.TextArrangement : #TextOnly,
    )
};

annotate service.OrderStatus with {
    name @(
        Common.Label : 'Status',
        Common.Text : status.name, 
        Common.Text.@UI.TextArrangement : #TextOnly,
    )
};

annotate service.Orders with {
    Country @(
        Common.Text : Country.name,
        Common.Text.@UI.TextArrangement : #TextOnly,
    )
};

annotate service.OrderItems with @(
    UI.LineItem #i18nOrderedItems : [
        {
            $Type : 'UI.DataField',
            Value : book.title,
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

annotate service.OrderLogs with @(
    UI.LineItem #OrderLog : [
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
            Value : modifiedAt,
            Label : '{i18n>UpdatedOn}',
        },
    ]
);

annotate service.OrderLogs with {
    status @(
        Common.Text : status.name,
        Common.Label: 'Order Status',
        Common.Text.@UI.TextArrangement : #TextOnly,
    )
};

annotate service.Books with {
    price @Measures.ISOCurrency : currency
};

annotate service.Orders with {
    totalPrice @Measures.ISOCurrency : 'EURO'
};

annotate service.OrderItems with {
    netprice @Measures.ISOCurrency : book.currency
};

