import { deleteInvoiceRoute } from './invoice/deleteInvoice.js'
import { createInvoiceRoute } from './invoice/createInvoice.js'
import { updateInvoiceRoute } from './invoice/updateInvoice.js'
import { getInvoiceRoute } from './invoice/getInvoice.js'
import { getInvoicesRoute } from './invoice/getInvoices.js'
import { addLineItemRoute } from './lineItem/addLineItem.js'
import { deleteLineItemRoute } from './lineItem/deleteLineItem.js'
import { updateLineItemRoute } from './lineItem/updateLineItem.js'

const configureAPIRoute = (app) => {
    app.post('/api/v1', createInvoiceRoute)
    app.get('/api/v1', getInvoicesRoute)
    app.get('/api/v1/:id', getInvoiceRoute)
    app.put('/api/v1', updateInvoiceRoute)
    app.delete('/api/v1/:id', deleteInvoiceRoute)

    app.put('/api/v1/:id', updateLineItemRoute)
    app.delete('/api/v1/:invoiceId/:lineItemId', deleteLineItemRoute)
    app.post('/api/v1/:id/new', addLineItemRoute)
}

export { configureAPIRoute }