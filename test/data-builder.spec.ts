import { randomBoolean, randomId, randomNumber, randomNumberBetween, randomString } from '../src'

describe('Data builder', () => {
  describe('randomNumber', () => {
    it('generates', () => {
      expect(randomNumber()).toBeGreaterThanOrEqual(0)
    })
  })
  describe('randomNumberBetween', () => {
    it('generates a random number between two inputs', () => {
      const sut = randomNumberBetween(5, 10)

      expect(sut).toBeGreaterThanOrEqual(5)
      expect(sut).toBeLessThanOrEqual(10)
    })
  })
  describe('randomString', () => {
    it('generates a random string with the length between the two inputs', () => {
      const sut = randomString(10, 20)

      expect(sut.length).toBeGreaterThanOrEqual(10)
      expect(sut.length).toBeLessThanOrEqual(20)
    })
  })
  describe('randomId', () => {
    it('generates a random ID of the requested length', () => {
      expect(randomId(10).length).toBe(10)
    })
  })
  describe('randomBoolean', () => {
    it('returns a random boolean', () => {
      expect([true, false].includes(randomBoolean())).toBe(true)
    })
  })
})
