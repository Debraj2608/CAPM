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
        Text : 'Books',
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