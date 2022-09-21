import { strict as assert } from 'assert'
import { getAll } from './engine.js'

describe('engine', () => {
    it('should return everything when calling the getAll', async () => {
        const result = await getAll()
        assert.ok(result)
        assert.equal(result.length, 7)
        assert.equal(result[0].id, 'RT3080')  
    })
})