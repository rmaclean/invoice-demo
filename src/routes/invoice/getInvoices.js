import { getInvoices } from '../../data/engine.js'

const getInvoicesRoute = async (req, res) => {
    const invoices = await getInvoices(req.params.status)
    res.json(invoices)
}

export { getInvoicesRoute }