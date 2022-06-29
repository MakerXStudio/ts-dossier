import { deepClone } from './deep-clone'

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

export function proxyBuilder<TDataBuilder, TData extends object>(builder: {
  new (): TDataBuilder
}): () => DynamicDataBuilder<TDataBuilder, TData> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return () => new Proxy(new builder(), proxyHandler)
}
