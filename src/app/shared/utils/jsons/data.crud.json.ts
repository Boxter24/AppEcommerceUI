const dataCrud = [
    {
        key: 'user', //url
        singular: 'user', //Text Singular
        plural: 'users', //text Plural
        headerDatatable: [ //Header of the Datatable
            'fullname',
            'email',
            'role',
        ],
        formControlName: [ //Inputs Modal
            ['fullname', 'text'], //text - Type
            ['email', 'email'],
            ['password', 'password'],
        ],
        service: '/ecommerce/dashboard/user', //Service
    },
    {
        key: 'category',
        singular: 'category',
        plural: 'categories',
        headerDatatable: [
            'name',
            'active',
        ],
        formControlName: [
            ['name', 'text'],
            ['active', 'radiobutton'],
        ],
        service: '/ecommerce/dashboard/category',
    },
    {
        key: 'product',
        singular: 'product',
        plural: 'products',
        headerDatatable: [
            'name',
            'price',
            'quantity',
            'category',
        ],
        formControlName: [
            ['name', 'text'],
            ['price', 'number'],
            ['quantity', 'number'],
            ['category', 'select'],
        ],
        nameRelation: [
            {
                key: 'category',//foreing key in tables
                name: 'name'//take data table
            }
        ],
        service: '/ecommerce/dashboard/product',
        relation: '/ecommerce/dashboard/category', //Relations Tables
    }
]

export function findElement(key: String){ //Get DataCrud
    let element = dataCrud.find((e) => e.key == key)
    return element;
}
