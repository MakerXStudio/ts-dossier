import { shapeMother } from './object-mother/shape-mother'

describe('The square', () => {
  it('has four sides', () => {
    const shape = shapeMother.square().build()
    expect(shape.sides).toBe(4)
  })
  it('is named correctly', () => {
    const shape = shapeMother.square().build()
    expect(shape.name).toBe('Square Intercepted')
  })
  it('is coloured blue', () => {
    const shape = shapeMother.square().build()
    expect(shape.colour).toBe('Blue')
  })
})
