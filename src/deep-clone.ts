/* eslint-disable @typescript-eslint/no-explicit-any */
// Ref: https://javascript.plainenglish.io/deep-clone-an-object-and-preserve-its-type-with-typescript-d488c35e5574
// TODO: Make this the fallback when using classes or when structuredClone is unavailable
/**
 * Deeply clones the supplied source
 *
 * ```typescript
 *   const source = { a: 1, b: { a: 2 } }
 *   const cloneA = deepClone(source)
 *   console.log(cloneA !== source) // Outputs false
 * ```
 *
 * @template T
 * @param {T} source The source value to clone
 * @return {T} A clone of the source
 */
export function deepClone<T>(source: T): T {
  if (Array.isArray(source)) return source.map((item) => deepClone(item)) as unknown as T

  if (source instanceof Int8Array) return new Int8Array(source) as unknown as T
  if (source instanceof Uint8Array) return new Uint8Array(source) as unknown as T
  if (source instanceof Uint8ClampedArray) return new Uint8ClampedArray(source) as unknown as T
  if (source instanceof Int16Array) return new Int16Array(source) as unknown as T
  if (source instanceof Uint16Array) return new Uint16Array(source) as unknown as T
  if (source instanceof Int32Array) return new Int32Array(source) as unknown as T
  if (source instanceof Uint32Array) return new Uint32Array(source) as unknown as T
  if (source instanceof Float32Array) return new Float32Array(source) as unknown as T
  if (source instanceof Float64Array) return new Float64Array(source) as unknown as T
  if (source instanceof BigInt64Array) return new BigInt64Array(source) as unknown as T
  if (source instanceof BigUint64Array) return new BigUint64Array(source) as unknown as T

  if (source instanceof Date) return new Date(source.getTime()) as unknown as T

  if (source && typeof source === 'object') {
    // Support mongoose ObjectId
    if (Object.getPrototypeOf(source).constructor?.name === 'ObjectId' && Object.getPrototypeOf(source)._bsontype === 'ObjectID') {
      return Object.getPrototypeOf(source).constructor(source) as unknown as T
    }

    return Object.getOwnPropertyNames(source).reduce(
      (o, prop) => {
        Object.defineProperty(o, prop, Object.getOwnPropertyDescriptor(source, prop) as any)
        o[prop] = deepClone((source as Record<string, any>)[prop])
        return o as unknown as T
      },
      Object.create(Object.getPrototypeOf(source)),
    )
  }

  return source
}
