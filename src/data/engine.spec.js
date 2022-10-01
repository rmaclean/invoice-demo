import { strict as assert } from 'assert'
import { getInvoices, addInvoice, deleteInvoice } from './engine.js'
import mock from 'mock-fs'
import fs from 'fs'

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
})