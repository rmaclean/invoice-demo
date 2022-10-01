import { deleteLineItem } from '../../data/engine.js'

const deleteLineItemRoute = async (req, res) => {
    const result = await deleteLineItem(req.params.invoiceId, req.params.lineItemId)

    if (!result.success) {
        res.status(400).send(result.error)
        return
    }

    res.status(204).send('')
}

export { deleteLineItemRoute }