import { getInvoices } from '../data/engine.js'
import { enhanceInvoiceForRendering } from '../lib/enhanceInvoiceForRendering.js'

const configureHomeRoute = (app) => {
    app.get('/', async (_req, res) => {
        const invoices = (await getInvoices()).map(i => enhanceInvoiceForRendering(i))
        const hasInvoices = invoices.length > 0
        res.render('home', {
            invoices,
            hasInvoices
        })
    })
}

export { configureHomeRoute }