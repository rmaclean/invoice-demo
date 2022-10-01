import { Validator } from 'jsonschema'

const draftInvoiceSchema = {
    id: '/invoice',
    type: 'object',
    properties: {
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
        senderAddress: {
            '$ref': '/address'
        },
        clientAddress: {
            '$ref': '/address'
        },
    },
}

const buildInvoiceSchema = () => {
    return Object.assign({}, draftInvoiceSchema, {
        required: [
            'clientAddress',
            'clientEmail',
            'clientName',
            'description',
            'paymentTerms',
            'senderAddress',
        ]
    })
}

const invoiceSchema = buildInvoiceSchema()

const buildValidator = () => {
    var validator = new Validator()

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