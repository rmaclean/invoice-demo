import { strict as assert } from 'assert'
import { getInvoices } from './engine.js'

describe('engine', () => {
    it('should return everything when calling the getInvoices', async () => {
        const result = await getInvoices()
        assert.ok(result)
        assert.equal(result.length, 7)
        assert.equal(result[0].id, 'RT3080')  
    })

    it('should return just paid when calling the getInvoices with a filter for paid', async () => {
        const result = await getInvoices({status: 'paid'})
        assert.ok(result)
        assert.equal(result.length, 2)
        assert.equal(result[0].id, 'RT3080')  
    })
})