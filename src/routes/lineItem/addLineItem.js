import { addLineItem } from '../../data/engine.js'

const addLineItemRoute = async (req, res) => {
    const result = await addLineItem(req.params.id, req.body)

    if (!result.success) {
        res.status(400).send(result.error)
        return
    }

    res.json(result.invoice)
}

export { addLineItemRoute }