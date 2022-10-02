window.createDraftInvoice = async () => {
    const draftInvoiceResponse = await fetch('/api/v1', {
        method: 'POST'
    })

    const draftInvoice = await draftInvoiceResponse.json()

    draftInvoice.description = document.getElementById('projectDescription').value
    draftInvoice.clientName = document.getElementById('clientsName').value
    draftInvoice.clientEmail = document.getElementById('clientsEmail').value
    draftInvoice.clientAddress = {
        street: document.getElementById('clientAddress').value,
        city: document.getElementById('clientCity').value,
        postCode: document.getElementById('clientPostCode').value,
        country: document.getElementById('clientCountry').value,
    }
    draftInvoice.senderAddress = {
        street: document.getElementById('billfromAddress').value,
        city: document.getElementById('billfromCity').value,
        postCode: document.getElementById('billfromPostCode').value,
        country: document.getElementById('billfromCountry').value,
    }
    draftInvoice.paymentTerms = +document.getElementById('paymentTerms').value

    const updateResult = await fetch('/api/v1', {
        method: 'PUT',
        body: JSON.stringify(draftInvoice),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })

    if (!updateResult.ok) {
        alert(await updateResult.text())
    } else {
        window.location.href = '/'
    }
}