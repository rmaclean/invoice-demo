import { strict as assert } from 'assert'
import { createID } from './createID.js'

describe('createID', () => {
    it('should create an ID when called', () => {
        const id = createID([])
        assert.match(id, /[A-Z]{2}[0-9]{4}/)
    })
})