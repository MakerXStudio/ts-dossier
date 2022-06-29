import { shapeBuilder } from './builder/shape-builder'
import { mongooseModelBuilder } from './builder/mongoose-model-builder'

describe('Data builder', () => {
  it('passes through when classes defines with method', () => {
    expect(shapeBuilder().withName('t').build().name).toBe('t Intercepted')
  })
  it('proxies undeclared with method to general setter', () => {
    expect(shapeBuilder().withSides(99).build().sides).toBe(99)
  })
  it('set the value against the property', () => {
    expect(shapeBuilder().with('colour', 'Green').build().colour).toBe('Green')
  })
  it('supports optional properties', () => {
    expect(shapeBuilder().withRadius(10).build().radius).toBe(10)
  })
})

describe('Mongoose model builder', () => {
  it('Does not error on ObjectId.toString()', () => {
    expect(mongooseModelBuilder().build().someId.toString()).toBeTruthy()
  })
})
