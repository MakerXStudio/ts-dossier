[**@makerx/ts-dossier**](/docs/README.md)

***

[@makerx/ts-dossier](/docs/README.md) / incrementedNumber

# Function: incrementedNumber()

> **incrementedNumber**(`key`): `number`

Returns an incremented number or zero if be called with the `key` for the first time.

```typescript
  let countKey1 = incrementedNumber('key1')
  countKey1 = incrementedNumber('key1')
  console.log(countKey1) // Outputs 1

  const countKey2 = incrementedNumber('key2')
  console.log(countKey2) // Outputs 0
```

## Parameters

### key

`string`

The key to track the incremented counter against.

## Returns

`number`
