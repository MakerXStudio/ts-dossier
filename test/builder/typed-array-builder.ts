import { DataBuilder, dossierProxy } from '../../src'
import { TypedArrayModel } from '../model/typed-array-model'

export class TypedArrayBuilder extends DataBuilder<TypedArrayModel> {
  constructor() {
    super({
      int8Array: Int8Array.from([-1, 2, 3]),
      uint8Array: Uint8Array.from([1, 2, 3]),
      uint8ClampedArray: Uint8ClampedArray.from([1, 2, 3]),
      int16Array: Int16Array.from([-1, 2, 3]),
      uint16Array: Uint16Array.from([1, 2, 3]),
      int32Array: Int32Array.from([-1, 2, 3]),
      uint32Array: Uint32Array.from([1, 2, 3]),
      float32Array: Float32Array.from([1, 2, 3]),
      float64Array: Float64Array.from([1, 2, 3]),
      bigInt64Array: BigInt64Array.from([BigInt(-1), BigInt(2), BigInt(3)]),
      bigUint64Array: BigUint64Array.from([BigInt(1), BigInt(2), BigInt(3)]),
    })
  }
}

export const typedArrayBuilder = dossierProxy<TypedArrayBuilder, TypedArrayModel>(TypedArrayBuilder)
