using OrderService as service from '../../srv/order-service';
using from '../../db/schema';

annotate service.Orders with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : '{i18n>TotalPrice}',
                Value : totalPrice,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>Status}',
                Value : status_code,
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
            CriticalityRepresentation : #WithIcon,
        },
    ],
);

annotate service.Orders with {
    status @(
        Common.Text : status.description,
        Common.Text.@UI.TextArrangement : #TextOnly,
        )
};

annotate service.OrderStatus with {
    description @(
        Common.Text : descr,
        Common.Text.@UI.TextArrangement : #TextOnly,
    )
};

