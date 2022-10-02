import { getInvoices } from '../data/engine.js'

const currencyFormatter = new Intl.NumberFormat('en-GB',
    {
        notation: 'standard',
        maximumFractionDigits: 2,
        style: 'currency',
        currency: 'GBP',
    })

const mapInvoiceForRendering = (invoice) => {
    return Object.assign({}, invoice, {
        isDraft: invoice.status === 'draft',
        isPending: invoice.status === 'pending',
        isPaid: invoice.status === 'paid',
        hasDue: !!invoice.paymentDue,
        totalCurrency: currencyFormatter.format(invoice.total),
        status: invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)
    })
}

const configureHomeRoute = (app) => {
    app.get('/', async (_req, res) => {
        const invoices = (await getInvoices()).map(i => mapInvoiceForRendering(i))
        const hasInvoices = invoices.length > 0
        res.render('home', {
            invoices,
            hasInvoices
        })
    })
}

export { configureHomeRoute }