import { getInvoices } from '../data/engine.js'

const getInvoice = async (_req, res) => {
    const invoices = await getInvoices()
    res.json(invoices)
}

export { getInvoice }