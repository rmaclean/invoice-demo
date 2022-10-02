window.createInvoice = async (id, setStatusToPending) => {
    if (setStatusToPending) {
        if (!document.getElementById("newInvoiceForm").reportValidity()) {
            return
        }
    }

    const draftInvoice = {
        id,
        createdAt: document.getElementById('issueDate').value,
        description: document.getElementById('projectDescription').value,
        clientName: document.getElementById('clientsName').value,
        clientEmail: document.getElementById('clientsEmail').value,
        clientAddress: {
            street: document.getElementById('clientAddress').value,
            city: document.getElementById('clientCity').value,
            postCode: document.getElementById('clientPostCode').value,
            country: document.getElementById('clientCountry').value,
        },
        senderAddress: {
            street: document.getElementById('billfromAddress').value,
            city: document.getElementById('billfromCity').value,
            postCode: document.getElementById('billfromPostCode').value,
            country: document.getElementById('billfromCountry').value,
        },
        paymentTerms: +document.getElementById('paymentTerms').value
    }

    if (setStatusToPending) {
        draftInvoice.status = 'pending'
    } else {
        draftInvoice.status = 'draft'
    }


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

window.deleteInvoice = async (id) => {
    await fetch(`/api/v1/${id}`, {
        method: 'DELETE',
    })

    window.location.href = '/'
}

// window.addLineItem = async (id) => {
//     const result = await fetch(`/api/v1/${id}/new`, {
//         method: 'POST',
//         body: JSON.stringify({
//             name: "PENDING",
//             price: 0,
//             quantity: 1
//         }),
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//     })

//     if (!result.ok) {
//         alert(await result.text())
//     } else {
//         window.location.href = `/invoice/${id}`
//     }
// }