import { Validator } from 'jsonschema'

const draftInvoiceSchema = {
    id: '/invoice',
    type: 'object',
    properties: {
        id: {
            type: 'string'
        },
        createdAt: {
            type: 'string',
            format: 'date'
        },
        paymentDue: {
            type: 'string',
            format: 'date'
        },
        description: {
            type: 'string'
        },
        paymentTerms: {
            type: 'integer'
        },
        clientName: {
            type: 'string'
        },
        clientEmail: {
            type: 'string'
        },
        status: {
            type: 'string'
        },
        senderAddress: {
            '$ref': '/address'
        },
        clientAddress: {
            '$ref': '/address'
        },
        items: {
            type: 'array',
            items: {
                '$ref': '/lineItem'
            }
        },
        total: {
            type: 'number'
        }
    },
}

const buildInvoiceSchema = () => {
    return Object.assign({}, draftInvoiceSchema, {
        required: [
            'clientAddress',
            'clientEmail',
            'clientName',
            'createdAt',
            'description',
            'id',
            'items',
            'paymentDue',
            'paymentTerms',
            'senderAddress',
            'status',
            'total'
        ]
    })
}

const invoiceSchema = buildInvoiceSchema()

const buildValidator = () => {
    var validator = new Validator()
    validator.addSchema({
        id: '/lineItem',
        type: 'object',
        properties: {
            name: {
                'type': 'string'
            },
            quantity: {
                'type': 'integer'
            },
            price: {
                type: 'number'
            },
            total: {
                type: 'number'
            }
        },
        required: [
            'name',
            'price',
            'quantity',
            'total'
        ],
    }, '/lineItem')

    validator.addSchema({
        id: '/address',
        type: 'object',
        properties: {
            street: {
                type: 'string'
            },
            city: {
                type: 'string'
            },
            postCode: {
                type: 'string'
            },
            country: {
                type: 'string'
            }
        },
        required: [
            'city',
            'country',
            'postCode',
            'street'
        ],
    }, '/address')

    return validator
}

const validator = buildValidator()

const invoiceSchemaValidator = (invoice) => {
    return validator.validate(invoice, invoiceSchema, { required: true })
}

const draftInvoiceSchemaValidator = (invoice) => {
    return validator.validate(invoice, draftInvoiceSchema, { required: true })
}

export { invoiceSchemaValidator, draftInvoiceSchemaValidator }