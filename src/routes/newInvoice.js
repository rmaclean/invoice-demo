const configureNewInvoice = (app) => {
    app.get('/new', async (_req, res) => {
        res.render('newInvoice', {})
    })
}

export { configureNewInvoice }