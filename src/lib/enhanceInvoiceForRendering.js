const currencyFormatter = new Intl.NumberFormat('en-GB',
    {
        notation: 'standard',
        maximumFractionDigits: 2,
        style: 'currency',
        currency: 'GBP',
    })

const enhanceInvoiceForRendering = (invoice) => {
    return Object.assign({}, invoice, {
        isDraft: invoice.status === 'draft',
        isPending: invoice.status === 'pending',
        isPaid: invoice.status === 'paid',
        hasDue: !!invoice.paymentDue,
        totalCurrency: currencyFormatter.format(invoice.total),
        status: invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)
    })
}

export { enhanceInvoiceForRendering }