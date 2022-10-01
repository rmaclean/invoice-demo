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

const reconcileInvoiceTotal = async (invoice) => {
    const total = invoice.items.map(l => l.total).reduce((accum, curr) => accum += curr, 0)
    invoice.total = total
    return await updateInvoice(invoice)
}

const addLineItem = async (invoiceId, lineItem) => {
    if (!invoiceId || !lineItem || !lineItem.name || !lineItem.price || !lineItem.quantity) {
        return {
            success: false,
            error: 'invalid data'
        }
    }

    const dbIndex = await db.getIndex('/data', invoiceId)

    if (dbIndex === -1) {
        return {
            success: false,
            error: 'invoice not found'
        }
    }

    const lineItemForDB = Object.assign({}, lineItem, {
        total: lineItem.price * lineItem.quantity
    })

    const invoicePriorToLineItemAddition = await db.getObject(`/data[${dbIndex}]`)
    const existingLineItem = invoicePriorToLineItemAddition.items.find(l => l.name.toUpperCase() === lineItem.name.toUpperCase())
    if (existingLineItem) {
        return {
            success: false,
            error: 'name in use'
        }
    }

    await db.push(`/data[${dbIndex}]/items[]`, lineItemForDB)

    const invoiceAfterToLineItemAddition = await db.getObject(`/data[${dbIndex}]`)
    return reconcileInvoiceTotal(invoiceAfterToLineItemAddition)
}

const deleteLineItem = async (invoiceId, lineItemName) => {
    if (!invoiceId || !lineItemName) {
        return {
            success: false,
            error: 'invalid data'
        }
    }

    const dbIndex = await db.getIndex('/data', invoiceId)

    if (dbIndex === -1) {
        return {
            success: false,
            error: 'invoice not found'
        }
    }

    const invoicePriorToLineItemRemoval = await db.getObject(`/data[${dbIndex}]`)
    const existingLineItemIndex = invoicePriorToLineItemRemoval.items.findIndex(l => l.name.toUpperCase() === lineItemName.toUpperCase())
    if (existingLineItemIndex === -1) {
        return {
            success: false,
            error: 'line item not found'
        }
    }

    await db.delete(`/data[${dbIndex}]/items[${existingLineItemIndex}]`)
    const invoiceAfterChanges = await db.getObject(`/data[${dbIndex}]`)
    return reconcileInvoiceTotal(invoiceAfterChanges) 
}

export { getInvoices, addInvoice, deleteInvoice, getInvoice, updateInvoice, addLineItem, deleteLineItem }