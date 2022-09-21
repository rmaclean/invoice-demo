import { strict as assert } from 'assert'
import { getInvoices } from './engine.js'

describe('engine', () => {
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
})