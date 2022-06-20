import { randomUUID } from 'crypto'

/**
 * Generates a random number between 0 or [Number.MIN_SAFE_INTEGER](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_SAFE_INTEGER) when `allowNegative` is set
 * and [Number.MAX_SAFE_INTEGER](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER).
 *
 * ```typescript
 *   const unsignedNumber = randomNumber()
 *   const signedNumber = randomNumber(true)
 * ```
 * @param allowNegative A flag to allow negative numbers.
 */
export function randomNumber(allowNegative = false): number {
  return randomNumberBetween(allowNegative ? Number.MIN_SAFE_INTEGER : 0, Number.MAX_SAFE_INTEGER)
}

/**
 * Generates a random number between `min` and `max`
 *
 * ```typescript
 *   const number = randomNumber(10, 20)
 * ```
 */
export function randomNumberBetween(min: number, max: number): number {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * Generates a random string with a length between `min` and `max`
 *
 * ```typescript
 *   const string = randomString(5, 10)
 * ```
 */
export function randomString(min: number, max: number): string {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  const length = randomNumberBetween(min, max)
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

/**
 * Generates a cryptographically random UUID in the form of 00000000-0000-0000-0000-000000000000
 *  
 * ```typescript
 *   const id = randomId()
 * ```
 */
export function randomId(): string {
  return randomUUID()
}

export const randomDateRangeMin = new Date(1980, 1, 1)
export const randomDateRangeMax = new Date(2050, 1, 1)

/**
 * Generates a random date between {@linkplain randomDateRangeMin} and {@linkplain randomDateRangeMax}
 *
 * ```typescript
 *   const date = randomDate
 * ```
 */
export function randomDate(): Date {
  return randomDateBetween(randomDateRangeMax, randomDateRangeMax)
}

export function randomDateBetween(min: Date, max: Date): Date {
  return new Date(randomNumberBetween(new Date(min).getTime(), new Date(max).getTime()))
}

export function randomBoolean(): boolean {
  return randomNumberBetween(0, 1) === 1
}

const incrementedNumberMap = new Map<string, number>()

export function resetIncrementedNumbers() {
  incrementedNumberMap.clear()
}

export function incrementedNumber(key: string): number {
  if (!incrementedNumberMap.has(key)) {
    incrementedNumberMap.set(key, 0)
  }
  incrementedNumberMap.set(key, (incrementedNumberMap.get(key) ?? 0) + 1)
  return incrementedNumberMap.get(key) ?? 0
}

export function randomElement<T>(elements: T[]): T {
  return elements[randomNumberBetween(0, elements.length - 1)]
}
