import { strict as assert } from 'assert'
import { getNowString } from './dateTools.js'
import sinon from 'sinon'

describe('getNowString', () => {
    it('should create the date in the right format', () => {
        const clock = sinon.useFakeTimers({
            now: 1483228800000,
          })

          try {
            const value = getNowString()
            assert.equal(value, '2017-01-01')
          } finally {
            clock.restore()
          }
    })
})