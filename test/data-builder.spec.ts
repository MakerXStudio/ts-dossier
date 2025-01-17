import { shapeBuilder } from './builder/shape-builder'
import { mongooseModelBuilder } from './builder/mongoose-model-builder'
import { typedArrayBuilder } from './builder/typed-array-builder'

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

describe('Typed array builder', () => {
  it('Builds a typed array', () => {
    const model = typedArrayBuilder().build()

    expect(model.int8Array).toBeInstanceOf(Int8Array)
    expect(model.int8Array.length).toBe(3)
    expect(model.int8Array[0]).toBe(-1)
    expect(model.int8Array[1]).toBe(2)
    expect(model.int8Array[2]).toBe(3)

    expect(model.uint8Array).toBeInstanceOf(Uint8Array)
    expect(model.uint8Array.length).toBe(3)
    expect(model.uint8Array[0]).toBe(1)
    expect(model.uint8Array[1]).toBe(2)
    expect(model.uint8Array[2]).toBe(3)

    expect(model.uint8ClampedArray).toBeInstanceOf(Uint8ClampedArray)
    expect(model.uint8ClampedArray.length).toBe(3)
    expect(model.uint8ClampedArray[0]).toBe(1)
    expect(model.uint8ClampedArray[1]).toBe(2)
    expect(model.uint8ClampedArray[2]).toBe(3)

    expect(model.int16Array).toBeInstanceOf(Int16Array)
    expect(model.int16Array.length).toBe(3)
    expect(model.int16Array[0]).toBe(-1)
    expect(model.int16Array[1]).toBe(2)
    expect(model.int16Array[2]).toBe(3)

    expect(model.uint16Array).toBeInstanceOf(Uint16Array)
    expect(model.uint16Array.length).toBe(3)
    expect(model.uint16Array[0]).toBe(1)
    expect(model.uint16Array[1]).toBe(2)
    expect(model.uint16Array[2]).toBe(3)

    expect(model.int32Array).toBeInstanceOf(Int32Array)
    expect(model.int32Array.length).toBe(3)
    expect(model.int32Array[0]).toBe(-1)
    expect(model.int32Array[1]).toBe(2)
    expect(model.int32Array[2]).toBe(3)

    expect(model.uint32Array).toBeInstanceOf(Uint32Array)
    expect(model.uint32Array.length).toBe(3)
    expect(model.uint32Array[0]).toBe(1)
    expect(model.uint32Array[1]).toBe(2)
    expect(model.uint32Array[2]).toBe(3)

    expect(model.float32Array).toBeInstanceOf(Float32Array)
    expect(model.float32Array.length).toBe(3)
    expect(model.float32Array[0]).toBe(1)
    expect(model.float32Array[1]).toBe(2)
    expect(model.float32Array[2]).toBe(3)

    expect(model.float64Array).toBeInstanceOf(Float64Array)
    expect(model.float64Array.length).toBe(3)
    expect(model.float64Array[0]).toBe(1)
    expect(model.float64Array[1]).toBe(2)
    expect(model.float64Array[2]).toBe(3)

    expect(model.bigInt64Array).toBeInstanceOf(BigInt64Array)
    expect(model.bigInt64Array.length).toBe(3)
    expect(model.bigInt64Array[0]).toBe(BigInt(-1))
    expect(model.bigInt64Array[1]).toBe(BigInt(2))
    expect(model.bigInt64Array[2]).toBe(BigInt(3))

    expect(model.bigUint64Array).toBeInstanceOf(BigUint64Array)
    expect(model.bigUint64Array.length).toBe(3)
    expect(model.bigUint64Array[0]).toBe(BigInt(1))
    expect(model.bigUint64Array[1]).toBe(BigInt(2))
    expect(model.bigUint64Array[2]).toBe(BigInt(3))
  })
})
