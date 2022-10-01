import { getInvoices } from '../data/engine.js'

const getInvoices = async (_req, res) => {
    const invoices = await getInvoices()
    res.json(invoices)
}

export { getInvoices }