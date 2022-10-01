import { getInvoices } from '../data/engine.js'

const getInvoicesRoute = async (_req, res) => {
    const invoices = await getInvoices()
    res.json(invoices)
}

export { getInvoicesRoute }