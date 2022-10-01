import { deleteInvoice } from '../../data/engine.js'

const deleteInvoiceRoute = async (req, res) => {
    const result = await deleteInvoice(req.params.id)
    if (!result.success) {
        res.status(400).send(result.error)
        return
    }

    res.status(204).send('')
}

export { deleteInvoiceRoute }