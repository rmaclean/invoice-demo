import * as invoiceAPI from './routes/invoiceAPI.js'
import express from 'express'

const port = 3000
const app = express()

app.use(express.static('public'))
app.use(express.json())

app.post('/api/v1', invoiceAPI.createInvoiceRoute)
app.get('/api/v1', invoiceAPI.getInvoicesRoute)
app.get('/api/v1/:id', invoiceAPI.getInvoiceRoute)
app.put('/api/v1', invoiceAPI.updateInvoiceRoute)
app.delete('/api/v1/:id', invoiceAPI.deleteInvoiceRoute)

app.put('/api/v1/:id', invoiceAPI.updateLineItemRoute)
app.delete('/api/v1/:invoiceId/:lineItemId', invoiceAPI.deleteLineItemRoute)
app.post('/api/v1/:id/new', invoiceAPI.addLineItemRoute)

app.get('/', (_req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Server is up at http://localhost:${port}`)
})