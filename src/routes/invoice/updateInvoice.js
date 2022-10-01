import { updateInvoice } from '../../data/engine.js'

const updateInvoiceRoute = async (req, res) => {
    const result = await updateInvoice(req.body)

    if (!result.success) {
        res.status(400).send(result.error)
        return
    }

    res.json(result.invoice)
}

export { updateInvoiceRoute }