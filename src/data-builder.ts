export function randomNumber(allowNegative = false): number {
  return randomNumberBetween(allowNegative ? Number.MIN_SAFE_INTEGER : 0, Number.MAX_SAFE_INTEGER)
}

export function randomNumberBetween(min: number, max: number): number {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min)
}

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

export function randomId(length: number): string {
  return randomString(length, length)
}

export function randomDate(): Date {
  return randomDateBetween(new Date(1980, 1, 1), new Date(2040, 1, 1))
}

export function randomDateBetween(min: Date, max: Date): Date {
  return new Date(randomNumberBetween(new Date(min).getTime(), new Date(max).getTime()))
}

export function randomBoolean(): boolean {
  return randomNumberBetween(0, 1) === 1
}

const incrementedNumberMap = new Map<string, number>()

export function incrementedNumber(key: string): number {
  if (!incrementedNumberMap.has(key)) {
    incrementedNumberMap.set(key, 0)
  }
  incrementedNumberMap.set(key, incrementedNumberMap.get(key)! + 1)
  return incrementedNumberMap.get(key)!
}

export function randomElement<T>(elements: T[]): T {
  return elements[randomNumberBetween(0, elements.length - 1)]
}
