import { strict as assert } from 'assert'
import { getInvoices, addInvoice, deleteInvoice, getInvoice, updateInvoice, addLineItem, deleteLineItem } from './engine.js'
import mock from 'mock-fs'
import fs from 'fs'
import { incrementDate } from '../lib/dateTools.js'

describe('engine', () => {
    before(async () => {
        mock({
            './data/data.json': fs.readFileSync('./resources/testdata.json', "utf8")
        })
    })

    after(async () => {
        mock.restore()
    })

    describe('getInvoice', () => {
        it('should return everything when calling the getInvoices', async () => {
            const result = await getInvoices()
            assert.ok(result)
            assert.equal(result.length, 7)
            assert.equal(result[0].id, 'RT3080')
        })

        it('should return just paid when calling the getInvoices with a filter for paid', async () => {
            const result = await getInvoices({ status: 'paid' })
            assert.ok(result)
            assert.equal(result.length, 2)
            assert.equal(result[0].id, 'RT3080')
        })

        it('should return just one invoice when calling the getInvoices with a valid ID', async () => {
            const result = await getInvoices({ id: 'RT3080' })
            assert.ok(result)
            assert.equal(result.length, 1)
            assert.equal(result[0].id, 'RT3080')
        })

        it('should return just nothing when calling the getInvoices with a valid ID but the wrong state', async () => {
            const result = await getInvoices({ id: 'RT3080', status: 'pending' })
            assert.ok(result)
            assert.equal(result.length, 0)
        })

        it('should return nothing when calling the getInvoices with a invalid ID', async () => {
            const result = await getInvoices({ id: 'kjhkh' })
            assert.ok(result)
            assert.equal(result.length, 0)
        })
    })

    describe('addInvoice', () => {
        it('should add a draft invoice when called without anything', async () => {
            const result = await addInvoice()
            assert.ok(result)
            assert.equal(result.status, 'draft')
        })
    })

    describe('deleteInvoice', () => {
        it('should be able to delete valid invoice', async () => {
            const targetInvoice = await addInvoice()
            const result = await deleteInvoice(targetInvoice.id)
            assert.ok(result)
            assert.ok(result.success)
        })

        it('should not be able to delete invalid invoice', async () => {
            const result = await deleteInvoice('blah')
            assert.ok(result)
            assert.equal(false, result.success)
            assert.equal('invoice not found', result.error)
        })
    })

    describe('getInvoice', () => {
        it('should be able to get a valid invoice', async () => {
            const targetInvoice = await addInvoice()
            const result = await getInvoice(targetInvoice.id)
            assert.ok(result)
            assert.ok(result.success)
            assert.ok(result.invoice)
            assert.equal(result.invoice.id, targetInvoice.id)
        })

        it('should not be able to get an invalid invoice', async () => {
            const result = await getInvoice('blah')
            assert.ok(result)
            assert.equal(false, result.success)
            assert.equal('invoice not found', result.error)
        })
    })

    describe('updateInvoice', () => {
        it('should be able to update a valid invoice', async () => {
            const targetInvoice = await addInvoice()
            const result = await updateInvoice(targetInvoice)
            assert.ok(result)
            assert.ok(result.success)
            assert.ok(result.invoice)
            assert.equal(result.invoice.id, targetInvoice.id)
        })

        it('should not be able to update an invoice with invalid shape', async () => {
            const targetInvoice = await addInvoice()

            const result = await updateInvoice({ id: targetInvoice.id, dog: 'woof' })
            assert.ok(result)
            assert.equal(result.success, false)
            assert.equal(result.error, 'invalid data')
        })

        it('should not be able to update an invoice with no id', async () => {
            const result = await updateInvoice("asd")
            assert.ok(result)
            assert.equal(result.success, false)
            assert.equal(result.error, 'invalid data')
        })

        it('should not be able to update an invoice with wrong ID', async () => {
            const result = await updateInvoice({ id: 'blah', status: 'draft' })
            assert.ok(result)
            assert.equal(result.success, false)
            assert.equal(result.error, 'invoice not found')
        })

        it('should not be able to update an invoice a pending invoice with missing data', async () => {
            const targetInvoice = await addInvoice()

            targetInvoice.status = 'pending'
            const result = await updateInvoice(targetInvoice)
            assert.ok(result)
            assert.equal(result.success, false)
            assert.ok(result.error.startsWith('missing data'))
        })

        it('should set payment due correctly when setting payment terms', async () => {
            const targetInvoice = await addInvoice()

            targetInvoice.paymentTerms = 20

            const result = await updateInvoice(targetInvoice)
            assert.ok(result)
            assert.ok(result.success)
            assert.ok(result.invoice)
            assert.equal(result.invoice.id, targetInvoice.id)
            assert.equal(result.invoice.paymentTerms, 20)
            const expectedPaymentDate = incrementDate(targetInvoice.createdAt, 20)
            assert.equal(result.invoice.paymentDue, expectedPaymentDate)
        })
    })

    describe('addLineItem', () => {
        it('should be possible to add a line item to an invoice and it updates the total', async () => {
            const targetInvoice = await addInvoice()
            const result = await addLineItem(targetInvoice.id, {
                name: 'test',
                quantity: 1,
                price: 100,
            })

            assert.ok(result)
            assert.ok(result.success)

            const updatedInvoice = await getInvoice(targetInvoice.id)
            assert.equal(updatedInvoice.invoice.total, 100)
            assert.equal(updatedInvoice.invoice.items.length, 1)
            const lineItem = updatedInvoice.invoice.items[0]
            assert.equal(lineItem.name, 'test')
            assert.equal(lineItem.quantity, 1)
            assert.equal(lineItem.price, 100)
            assert.equal(lineItem.total, 100)
        })

        it('should not possible to add two line items with the same name to an invoice', async () => {
            const targetInvoice = await addInvoice()
            const firstLineItemResult = await addLineItem(targetInvoice.id, {
                name: 'test',
                quantity: 1,
                price: 100,
            })

            assert.ok(firstLineItemResult)
            assert.ok(firstLineItemResult.success)

            const secondLineItemResult = await addLineItem(targetInvoice.id, {
                name: 'TEST',
                quantity: 1,
                price: 100,
            })

            assert.ok(secondLineItemResult)
            assert.equal(secondLineItemResult.success, false)
            assert.equal(secondLineItemResult.error, 'name in use')
        })

        it('should not be possible to add a line item to a invalid invoice', async () => {
            const result = await addLineItem("bleh", {
                name: 'test',
                quantity: 1,
                price: 100,
            })

            assert.ok(result)
            assert.equal(result.success, false)
            assert.equal(result.error, 'invoice not found')
        })

        it('should not be possible to add a a bad line item', async () => {
            const targetInvoice = await addInvoice()
            const result = await addLineItem(targetInvoice.id, {
                name: 'test',
                quantity: 1,
            })


            assert.ok(result)
            assert.equal(result.success, false)
            assert.equal(result.error, 'invalid data')
        })
    })

    describe('removeLineItem', () => {
        it('should be possible to remove a valid line item to an invoice and it updates the total', async () => {
            const targetInvoice = await addInvoice()
            await addLineItem(targetInvoice.id, {
                name: 'test',
                quantity: 6,
                price: 20,
            })

            await addLineItem(targetInvoice.id, {
                name: 'dog',
                quantity: 1,
                price: 1000,
            })

            const result = await deleteLineItem(targetInvoice.id, 'TEST')
            assert.ok(result)
            assert.ok(result.success)

            const updatedInvoice = await getInvoice(targetInvoice.id)
            assert.equal(updatedInvoice.invoice.total, 1000)
            assert.equal(updatedInvoice.invoice.items.length, 1)
            const lineItem = updatedInvoice.invoice.items[0]
            assert.equal(lineItem.name, 'dog')
            assert.equal(lineItem.quantity, 1)
            assert.equal(lineItem.price, 1000)
            assert.equal(lineItem.total, 1000)
        })

        it('should not be possible to delete a line item to a invalid invoice', async () => {
            const result = await deleteLineItem("bleh", "pointless")

            assert.ok(result)
            assert.equal(result.success, false)
            assert.equal(result.error, 'invoice not found')
        })

        it('should not be possible to delete a invalid line item to a valid invoice', async () => {
            const targetInvoice = await addInvoice()
            await addLineItem(targetInvoice.id, {
                name: 'test',
                quantity: 100,
                price: 1000,
            })

            const result = await deleteLineItem(targetInvoice.id, "bad")

            assert.ok(result)
            assert.equal(result.success, false)
            assert.equal(result.error, 'line item not found')
        })
    })
})