[**@makerx/ts-dossier**](/docs/README.md)

***

[@makerx/ts-dossier](/docs/README.md) / dossierProxy

# Function: dossierProxy()

> **dossierProxy**\<`TDataBuilder`, `TData`\>(`builder`): () => `DynamicDataBuilder`\<`TDataBuilder`, `TData`\>

The proxy builder allows one to easily create a builder and have a [proxy][https://developer.mozilla.org/en-US/docs/web/javascript/reference/global\_objects/proxy/proxy](https://developer.mozilla.org/en-US/docs/web/javascript/reference/global_objects/proxy/proxy)
instance handle any with* methods not specifically declared by the builder itself.

```typescript
class ShapeBuilder extends DataBuilder<Shape> {
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

const shapeBuilder = dossierProxy<ShapeBuilder, Shape>(ShapeBuilder)

const shape = shapeBuilder().withName('Square').withSides(4).withColour('Red').build()

console.log(shape) // Outputs { name: 'Square Intercepted', sides: 4, colour: 'Red' }
```

## Type Parameters

• **TDataBuilder**

• **TData** *extends* `object`

## Parameters

### builder

() => `TDataBuilder`

The constructor to call to create a new instance of the builder.

## Returns

`Function`

### Returns

`DynamicDataBuilder`\<`TDataBuilder`, `TData`\>
