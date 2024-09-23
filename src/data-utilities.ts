import { randomUUID } from 'crypto'

/**
 * Generates a random number between 0 or [Number.MIN_SAFE_INTEGER](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_SAFE_INTEGER) when `allowNegative` is set
 * and [Number.MAX_SAFE_INTEGER](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER).
 *
 * ```typescript
 *   const unsignedNumber = randomNumber()
 *   const signedNumber = randomNumber(true)
 * ```
 * @param {boolean} [allowNegative=false] A flag to allow negative numbers.
 */
export function randomNumber(allowNegative = false): number {
  return randomNumberBetween(allowNegative ? Number.MIN_SAFE_INTEGER : 0, Number.MAX_SAFE_INTEGER)
}

/**
 * Generates a random number between `min` and `max`.
 *
 * ```typescript
 *   const number = randomNumber(10, 20)
 * ```
 *
 * @param {number} min The minimum (inclusive).
 * @param {number} max The maximum (inclusive).
 */
export function randomNumberBetween(min: number, max: number): number {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * Generates a float between `min` and `max`.
 *
 * ```typescript
 *   const number = randomFloatBetween(10, 20)
 * ```
 * @param {number} min The minimum (inclusive).
 * @param {number} max The maximum (inclusive).
 * @param {number} [decimals] The maximum amount of decimals.
 */
export function randomFloatBetween(min: number, max: number, decimals?: number) {
  const float = Math.random() * (max - min) + min
  return decimals ? parseFloat(float.toFixed(decimals)) : float
}

/**
 * Generates a random string with a length between `min` and `max`.
 *
 * ```typescript
 *   const string = randomString(5, 10)
 * ```
 *
 * @param {number} min The minimum length (inclusive).
 * @param {number} max The maximum length (inclusive).
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
 * Generates a cryptographically random UUID in the form of 00000000-0000-0000-0000-000000000000.
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
 * Generates a random date between {@linkplain randomDateRangeMin} and {@linkplain randomDateRangeMax}.
 *
 * ```typescript
 *   const date = randomDate()
 * ```
 */
export function randomDate(): Date {
  return randomDateBetween(randomDateRangeMax, randomDateRangeMax)
}

/**
 * Generates a random date between `min` and `max`.
 *
 * ```typescript
 *   const date = randomDateBetween(new Date(2001, 1, 1), new Date(2030, 1, 1))
 * ```
 *
 * @param {Date} min The minimum date (inclusive).
 * @param {Date} max The maximum date (inclusive).
 */
export function randomDateBetween(min: Date, max: Date): Date {
  return new Date(randomNumberBetween(new Date(min).getTime(), new Date(max).getTime()))
}

/**
 * Generates a random bool `true` or `false`
 *
 * ```typescript
 *   const bool = randomBoolean()
 * ```
 */
export function randomBoolean(): boolean {
  return randomNumberBetween(0, 1) === 1
}

const incrementedNumberMap = new Map<string, number>()

/**
 * Resets the incremented counters set when called by {@linkplain incrementedNumber}.
 */
export function resetIncrementedNumbers() {
  incrementedNumberMap.clear()
}

/**
 * Returns an incremented number or zero if be called with the `key` for the first time.
 *
 * ```typescript
 *   let countKey1 = incrementedNumber('key1')
 *   countKey1 = incrementedNumber('key1')
 *   console.log(countKey1) // Outputs 1
 *
 *   const countKey2 = incrementedNumber('key2')
 *   console.log(countKey2) // Outputs 0
 * ```
 *
 * @param {string} key The key to track the incremented counter against.
 */
export function incrementedNumber(key: string): number {
  if (!incrementedNumberMap.has(key)) {
    incrementedNumberMap.set(key, 0)
  }
  incrementedNumberMap.set(key, (incrementedNumberMap.get(key) ?? 0) + 1)
  return incrementedNumberMap.get(key) ?? 0
}

/**
 * Returns a random element from the supplied collection.
 *
 * ```typescript
 *   const randomElement = randomElement([1, 2, 3, 4, 5])
 * ```
 *
 * @param {Array} elements The collection to select a random element from.
 */
export function randomElement<T>(elements: T[]): T {
  return elements[randomNumberBetween(0, elements.length - 1)]
}

// prettier-ignore
const nouns = ['rock', 'plant', 'carrot', 'hamburger', 'pie', 'mood', 'caterpillar', 'grasshopper', 'lizard', 'monkey', 'table', 'tesla', 'dog', 'cat', 'rocket', 'moon', 'atom', 'art', 'map', 'music', 'policy', 'truth', 'ball', 'lamp', 'bike', 'bus', 'plane', 'ship', 'boat']
// prettier-ignore
const adjectives = ['adorable', 'agreeable', 'adventurous', 'bewildered', 'blushing', 'brave', 'careful', 'clever', 'condemned', 'creepy', 'disturbed', 'doubtful', 'clever', 'smart', 'brainy', 'breakable', 'blushing', 'clumsy', 'crazy', 'exuberant', 'funny', 'hilarious', 'jealous', 'modern']
// prettier-ignore
const adverb = ['really', 'madly', 'abnormally', 'always', 'anxiously', 'blissfully', 'frenetically', 'queasily', 'warmly', 'rightfully', 'generally', 'hopefully', 'wonderfully', 'gloomily', 'strictly', 'busily', 'terribly', 'mightily', 'sometimes', 'greatly', 'lazily', 'carelessly', 'rudely']
// prettier-ignore
const mailProviders = ['gmail.com', 'outlook.com', 'yahoo.com', 'hotmail.com', 'aol.com', 'msn.com', 'hotmail.co.uk', 'web.de', 'me.com', 'mac.com']

/**
 * Generates a random "thing's" name.
 *
 * ```text
 *   Examples:
 *
 *   1. really adorable rock
 *   2. madly agreeable plant
 *   3. abnormally adventurous hamburger
 * ```
 *
 * ```typescript
 *   const name = randomThingName()
 * ```
 */
export function randomThingName(): string {
  const name = `${randomElement(adverb)} ${randomElement(adjectives)} ${randomElement(nouns)}`
  return name[0].toUpperCase() + name.substring(1)
}

// prettier-ignore
const xyNames = ['James', 'Robert', 'John', 'Michael', 'David', 'William', 'Richard', 'Joseph', 'Thomas', 'Charles', 'Christopher', 'Daniel', 'Matthew', 'Anthony', 'Mark', 'Donald', 'Steven', 'Paul', 'Andrew', 'Joshua', 'Kenneth', 'Kevin', 'Brian', 'George', 'Timothy', 'Ronald', 'Edward', 'Jason', 'Jeffrey', 'Ryan', 'Jacob', 'Gary', 'Nicholas', 'Eric', 'Jonathan', 'Stephen', 'Larry', 'Justin', 'Scott', 'Brandon', 'Benjamin', 'Samuel', 'Gregory', 'Alexander', 'Frank', 'Patrick', 'Raymond', 'Jack', 'Dennis', 'Jerry', 'Tyler', 'Aaron', 'Jose', 'Adam', 'Nathan', 'Henry', 'Douglas', 'Zachary', 'Peter', 'Kyle', 'Ethan', 'Walter', 'Noah', 'Jeremy', 'Christian', 'Keith', 'Roger', 'Terry', 'Gerald', 'Harold', 'Sean', 'Austin', 'Carl', 'Arthur', 'Lawrence', 'Dylan', 'Jesse', 'Jordan', 'Bryan', 'Billy', 'Joe', 'Bruce', 'Gabriel', 'Logan', 'Albert', 'Willie', 'Alan', 'Juan', 'Wayne', 'Elijah', 'Randy', 'Roy', 'Vincent', 'Ralph', 'Eugene', 'Russell', 'Bobby', 'Mason', 'Philip', 'Louis']
// prettier-ignore
const xxNames = ['Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen', 'Lisa', 'Nancy', 'Betty', 'Margaret', 'Sandra', 'Ashley', 'Kimberly', 'Emily', 'Donna', 'Michelle', 'Carol', 'Amanda', 'Dorothy', 'Melissa', 'Deborah', 'Stephanie', 'Rebecca', 'Sharon', 'Laura', 'Cynthia', 'Kathleen', 'Amy', 'Angela', 'Shirley', 'Anna', 'Brenda', 'Pamela', 'Emma', 'Nicole', 'Helen', 'Samantha', 'Katherine', 'Christine', 'Debra', 'Rachel', 'Carolyn', 'Janet', 'Catherine', 'Maria', 'Heather', 'Diane', 'Ruth', 'Julie', 'Olivia', 'Joyce', 'Virginia', 'Victoria', 'Kelly', 'Lauren', 'Christina', 'Joan', 'Evelyn', 'Judith', 'Megan', 'Andrea', 'Cheryl', 'Hannah', 'Jacqueline', 'Martha', 'Gloria', 'Teresa', 'Ann', 'Sara', 'Madison', 'Frances', 'Kathryn', 'Janice', 'Jean', 'Abigail', 'Alice', 'Julia', 'Judy', 'Sophia', 'Grace', 'Denise', 'Amber', 'Doris', 'Marilyn', 'Danielle', 'Beverly', 'Isabella', 'Theresa', 'Diana', 'Natalie', 'Brittany', 'Charlotte', 'Marie', 'Kayla', 'Alexis', 'Lori']
// prettier-ignore
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzales', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts', 'Gomez', 'Phillips', 'Evans', 'Turner', 'Diaz', 'Parker', 'Cruz', 'Edwards', 'Collins', 'Reyes', 'Stewart', 'Morris', 'Morales', 'Murphy', 'Cook', 'Rogers', 'Gutierrez', 'Ortiz', 'Morgan', 'Cooper', 'Peterson', 'Bailey', 'Reed', 'Kelly', 'Howard', 'Ramos', 'Kim', 'Cox', 'Ward', 'Richardson', 'Watson', 'Brooks', 'Chavez', 'Wood', 'James', 'Bennet', 'Gray', 'Mendoza', 'Ruiz', 'Hughes', 'Price', 'Alvarez', 'Castillo', 'Sanders', 'Patel', 'Long', 'Ross', 'Jimenez']

/**
 * Generates a random person's name.
 *
 * ```text
 *   Examples:
 *
 *   1. James Smith
 *   2. Mary Johnson
 *   3. John Williams
 *   5. Patricia Brown
 * ```
 *
 * ```typescript
 *   const name = randomPersonName()
 * ```
 */
export function randomPersonName(): string {
  return `${randomElement([...xyNames, ...xxNames])} ${randomElement(lastNames)}`
}

/**
 * Generates a random email address.
 *
 * ```text
 *   Examples:
 *
 *   1. really_adorable_rock@gmail.com
 *   2. madly_agreeable_plant@outlook.com
 *   3. abnormally_adventurous_hamburger@yahoo.com
 * ```
 *
 * ```typescript
 *   const name = randomEmail()
 * ```
 */
export function randomEmail(): string {
  return `${randomElement(adverb)}_${randomElement(adjectives)}_${randomElement(nouns)}@${randomElement(mailProviers)}`
}

/**
 * Generates a random phone number.
 *
 * ```text
 *   Examples:
 *
 *   1. 1000000000
 *   2. 8974562314
 *   3. 9982214305
 * ```
 *
 * ```typescript
 *   const phoneNumber = randomPhoneNumber()
 * ```
 * @param {number} [length = 10] The length of the phone number.
 */
export function randomPhoneNumber(length = 10) {
  return randomNumberBetween(parseInt('1'.padEnd(length, '0')), parseInt('9'.padEnd(length, '9')))
}

const topLevelDomains = ['.com', '.com.au', 'co.uk', '.org', '.net', '.edu']

/**
 * Generates a random url.
 *
 * ```text
 *   Examples:
 *
 *   1. really-adorable-rock.com
 *   2. madly-agreeable-plant.com.au
 *   3. abnormally-adventurous-hamburger.co.uk
 * ```
 *
 * ```typescript
 *   const name = randomUrl()
 * ```
 */
export function randomUrl() {
  return `${randomElement(adverb)}-${randomElement(adjectives)}-${randomElement(nouns)}${randomElement(topLevelDomains)}`
}
