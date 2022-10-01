import { getInvoice } from '../../data/engine.js'

const getInvoiceRoute = async (req, res) => {
    const result = await getInvoice(req.params.id)
    if (!result.success) {
        res.status(400).send(result.error)
        return
    }

    res.json(result.invoice)
}

export { getInvoiceRoute }