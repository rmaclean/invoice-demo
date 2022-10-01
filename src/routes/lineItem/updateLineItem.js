import { updateLineItem } from '../../data/engine.js'

const updateLineItemRoute = async (req, res) => {
    const result = await updateLineItem(req.params.id, req.body)

    if (!result.success) {
        res.status(400).send(result.error)
        return
    }

    res.json(result.invoice)
}

export { updateLineItemRoute }