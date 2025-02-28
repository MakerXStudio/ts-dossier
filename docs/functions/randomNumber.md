[**@makerx/ts-dossier**](/docs/README.md)

***

[@makerx/ts-dossier](/docs/README.md) / randomNumber

# Function: randomNumber()

> **randomNumber**(`allowNegative`?): `number`

Generates a random number between 0 or [Number.MIN_SAFE_INTEGER](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_SAFE_INTEGER) when `allowNegative` is set
and [Number.MAX_SAFE_INTEGER](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER).

```typescript
  const unsignedNumber = randomNumber()
  const signedNumber = randomNumber(true)
```

## Parameters

### allowNegative?

`boolean` = `false`

A flag to allow negative numbers.

## Returns

`number`
