import { strict as assert } from 'assert'
import { getNowString, incrementDate } from './dateTools.js'
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

describe('incrementDate', () => {
  it('should increment date', () => {
    const result = incrementDate('2017-01-01', 10)
    assert.equal(result, '2017-01-11')
  })

  it('should inot increment date if less than 0', () => {
    const result = incrementDate('2017-01-01', -9)
    assert.equal(result, '2017-01-01')
  })

  it('should inot increment date if days is 0', () => {
    const date = new Date(1483228800000)
    const result = incrementDate('2017-01-01', 0)
    assert.equal(result, '2017-01-01')
  })
})