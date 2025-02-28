[**@makerx/ts-dossier**](/docs/README.md)

***

[@makerx/ts-dossier](/docs/README.md) / DataBuilder

# Class: `abstract` DataBuilder\<T\>

Data builder is an abstract class builders can inherit to make working with the [dossierProxy](/docs/functions/dossierProxy.md) easier.

```typescript
export class ShapeBuilder extends DataBuilder<Shape> {
  constructor() {
    super({
      name: randomString(10, 20),
      sides: randomNumberBetween(1, 4),
      colour: randomElement(['Blue', 'Red', 'Yellow', 'Green']),
    })
  }

  public withName(name: string) {
    return this.with('name', name + ' Intercepted')
  }
}

export const shapeBuilder = dossierProxy<ShapeBuilder, Shape>(ShapeBuilder)
```

## Type Parameters

• **T**

## Constructors

### new DataBuilder()

> `protected` **new DataBuilder**\<`T`\>(`thing`): [`DataBuilder`](/docs/classes/DataBuilder.md)\<`T`\>

#### Parameters

##### thing

`T`

#### Returns

[`DataBuilder`](/docs/classes/DataBuilder.md)\<`T`\>

## Properties

### thing

> `protected` **thing**: `T`

## Methods

### build()

> **build**(): `T`

#### Returns

`T`

***

### clone()

> **clone**(): `this`

#### Returns

`this`

***

### with()

> **with**\<`K`\>(`key`, `value`): `this`

#### Type Parameters

• **K** *extends* `string` \| `number` \| `symbol`

#### Parameters

##### key

`K`

##### value

`T`\[`K`\]

#### Returns

`this`
