import { createInvoice, deleteInvoice, getInvoice, updateInvoice } from './routes/invoiceAPI.js'

import express from 'express'
const port = 3000
const app = express()

app.use(express.static('public'))

app.post('/api/v1', createInvoice)
app.get('/api/v1', getInvoice)
app.put('/api/v1', updateInvoice)
app.delete('/api/v1', deleteInvoice)

app.get('/', (_req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Server is up at http://localhost:${port}`)
})