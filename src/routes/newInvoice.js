import { addInvoice } from '../data/engine.js'

const configureNewInvoice = async (app) => {
    app.get('/new', async (_req, res) => {
        const draftInvoice = await addInvoice()
        res.render('newInvoice', {
            draftInvoice 
        })
    })
}

export { configureNewInvoice }