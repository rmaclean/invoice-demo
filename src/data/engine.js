import { createID } from '../lib/createID.js'
import { getNowString, incrementDate } from '../lib/dateTools.js'
import { JsonDB, Config } from 'node-json-db'
import { invoiceSchemaValidator, draftInvoiceSchemaValidator } from '../lib/schemaValidator.js'

const db = new JsonDB(new Config('./data/data.json', true, true, '/', true))

const getDataFromSource = async () => {
    return await db.getData('/data', true)
}

const getInvoices = async (filter) => {
    return (await getDataFromSource()).filter(i => {
        if (filter) {
            if (filter.status && i.status != filter.status) {
                return false
            }

            if (filter.id && i.id != filter.id) {
                return false
            }
        }

        // no filter
        return true
    })
}

const addInvoice = async () => {
    const allInvoices = await getDataFromSource()
    const id = createID(allInvoices)

    const record = {
        id,
        createdAt: getNowString(),
        status: 'draft',
        total: 0,
        items: [],
    }

    await db.push('/data[]', record, true)

    return record
}

const deleteInvoice = async (invoiceId) => {
    const dbIndex = await db.getIndex('/data', invoiceId)

    if (dbIndex === -1) {
        return {
            success: false,
            error: 'invoice not found'
        }
    }


    await db.delete(`/data[${dbIndex}]`)

    return {
        success: true
    }
}

const getInvoice = async (invoiceId) => {
    const dbIndex = await db.getIndex('/data', invoiceId)

    if (dbIndex === -1) {
        return {
            success: false,
            error: 'invoice not found'
        }
    }

    return {
        success: true,
        invoice: await db.getObject(`/data[${dbIndex}]`)
    }
}

const updateInvoice = async (invoice) => {
    if (!invoice || !invoice.id || !invoice.status) {
        return {
            success: false,
            error: 'invalid data'
        }
    }

    const invoiceId = invoice.id

    const dbIndex = await db.getIndex('/data', invoiceId)

    if (dbIndex === -1) {
        return {
            success: false,
            error: 'invoice not found'
        }
    }

    let validationResult
    if (invoice.status === 'draft') {
        validationResult = draftInvoiceSchemaValidator(invoice)
    } else {
        validationResult = invoiceSchemaValidator(invoice)
    }

    if (invoice.paymentTerms) {
        invoice.paymentDue = incrementDate(invoice.createdAt, invoice.paymentTerms)
    }

    if (!validationResult.valid) {
        return {
            success: false,
            error: `missing data:\n${validationResult.errors.map(error => error.message).join('\n')}`
        }
    }

    await db.push(`/data[${dbIndex}]`, invoice)

    return {
        success: true,
        invoice: await db.getObject(`/data[${dbIndex}]`)
    }
}

export { getInvoices, addInvoice, deleteInvoice, getInvoice, updateInvoice }