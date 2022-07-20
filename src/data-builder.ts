import { deepClone } from './deep-clone'

/**
 * Data builder is an abstract class builders can inherit to make working with the {@linkplain proxyBuilder} easier.
 *
 * ```typescript
 * export class ShapeBuilder extends DataBuilder<Shape> {
 *   constructor() {
 *     super({
 *       name: randomString(10, 20),
 *       sides: randomNumberBetween(1, 4),
 *       colour: randomElement(['Blue', 'Red', 'Yellow', 'Green']),
 *     })
 *   }
 *
 *   public withName(name: string) {
 *     return this.with('name', name + ' Intercepted')
 *   }
 * }
 *
 * export const shapeBuilder = proxyBuilder<ShapeBuilder, Shape>(ShapeBuilder)
 * ```
 */
export abstract class DataBuilder<T> {
  protected constructor(protected thing: T) {
    this.thing = thing
  }

  public with<K extends keyof T>(key: K, value: T[K]): this {
    this.thing[key] = value
    return this
  }

  public build(): T {
    return deepClone(this.thing)
  }

  public clone(): this {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return new Proxy(deepClone(this), proxyHandler)
  }
}

type WithMethods<T extends object, TBuilder> = {
  [K in keyof T as K extends string ? `with${Capitalize<K>}` : never]-?: (d: T[K]) => WithMethods<T, TBuilder> & TBuilder
} & TBuilder

const proxyHandler = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get: function (target: any, prop: string, receiver: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!target[prop] && prop.startsWith('with')) {
      const propertyName = prop[4].toLocaleLowerCase() + prop.substring(5)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (value: any) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        target.with(propertyName as any, value)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return receiver
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-argument
    return Reflect.get(target, prop, receiver)
  },
}

type DynamicDataBuilder<TDataBuilder, TData extends object> = TDataBuilder & WithMethods<TData, TDataBuilder>

/**
 * The proxy builder allows one to easily create a builder and have a [proxy]{@link https://developer.mozilla.org/en-US/docs/web/javascript/reference/global_objects/proxy/proxy}
 * instance handle any with* methods not specifically declared by the builder itself.
 *
 * ```typescript
 * class ShapeBuilder extends DataBuilder<Shape> {
 *   constructor() {
 *     super({
 *       name: randomString(10, 20),
 *       sides: randomNumberBetween(1, 4),
 *       colour: randomElement(['Blue', 'Red', 'Yellow', 'Green']),
 *     })
 *   }
 *
 *   public withName(name: string) {
 *     return this.with('name', name + ' Intercepted')
 *   }
 * }
 *
 * const shapeBuilder = proxyBuilder<ShapeBuilder, Shape>(ShapeBuilder)
 *
 * const shape = shapeBuilder().withName('Square').withSides(4).withColour('Red').build()
 *
 * console.log(shape) // Outputs { name: 'Square Intercepted', sides: 4, colour: 'Red' }
 * ```
 * @param builder The constructor to call to create a new instance of the builder.
 */
export function proxyBuilder<TDataBuilder, TData extends object>(builder: {
  new (): TDataBuilder
}): () => DynamicDataBuilder<TDataBuilder, TData> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return () => new Proxy(new builder(), proxyHandler)
}
