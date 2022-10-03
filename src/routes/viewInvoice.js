import { getInvoice } from '../data/engine.js'
import { enhanceInvoiceForRendering } from '../lib/enhanceInvoiceForRendering.js'

const configureViewInvoice = async (app) => {
    app.get('/invoice/:id', async (req, res) => {
        const result = await getInvoice(req.params.id)
        if (result.success) {
            const invoice = enhanceInvoiceForRendering(result.invoice)
            res.render('viewInvoice', {
                invoice
            })
        } else {
            res.render('404')
        }
    })
}

export { configureViewInvoice }