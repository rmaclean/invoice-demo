import { addInvoice } from '../../data/engine.js'

const createInvoiceRoute = async (_req, res) => {
    res.json(await addInvoice())
}

export { createInvoiceRoute }