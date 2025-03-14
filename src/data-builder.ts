import { deepClone } from './deep-clone'

/**
 * Data builder is an abstract class builders can inherit to make working with the {@linkplain dossierProxy} easier.
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
 * export const shapeBuilder = dossierProxy<ShapeBuilder, Shape>(ShapeBuilder)
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
    return new Proxy(deepClone(this), proxyHandler)
  }
}

type WithMethods<T extends object, TBuilder> = CoerceIntellisense<
  {
    [K in keyof T as K extends string ? `with${Capitalize<K>}` : never]-?: (d: T[K]) => WithMethods<T, TBuilder> & TBuilder
  } & TBuilder
>

export type CoerceIntellisense<T> = T extends infer O ? { [K in keyof O]: O[K] } : never

const proxyHandler = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get: function (target: any, prop: string, receiver: any) {
    if (!target[prop] && prop.startsWith('with')) {
      const propertyName = prop[4].toLocaleLowerCase() + prop.substring(5)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (value: any) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        target.with(propertyName as any, value)
        return receiver
      }
    }
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
 * const shapeBuilder = dossierProxy<ShapeBuilder, Shape>(ShapeBuilder)
 *
 * const shape = shapeBuilder().withName('Square').withSides(4).withColour('Red').build()
 *
 * console.log(shape) // Outputs { name: 'Square Intercepted', sides: 4, colour: 'Red' }
 * ```
 * @param builder The constructor to call to create a new instance of the builder.
 */
export function dossierProxy<TDataBuilder, TData extends object>(
  builder: new () => TDataBuilder,
): () => DynamicDataBuilder<TDataBuilder, TData> {
  return () => new Proxy(new builder(), proxyHandler)
}
