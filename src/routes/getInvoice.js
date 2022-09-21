import { getAll } from '../data/engine.js'

const getInvoice = async (_req, res) => {
    const invoices = await getAll()
    res.json(invoices)
}

export { getInvoice }