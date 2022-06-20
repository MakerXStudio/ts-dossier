type NotUndefined<T> = T extends undefined ? never : T

export function isDefined<T>(x: T): x is NotUndefined<T> {
  return x !== undefined
}
