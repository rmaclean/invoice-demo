import { createID } from '../lib/createID.js'
import { getNowString } from '../lib/dateTools.js'
import { JsonDB, Config } from 'node-json-db'

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
        status: 'draft'
    }

    await db.push('/data[]', record, true)

    return record
}

const deleteInvoice = async (invoiceId) => {
    const dbIndex = await db.getIndex('/data[]', invoiceId)

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

export { getInvoices, addInvoice, deleteInvoice }