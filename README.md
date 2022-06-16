# TypeScript ObjectMother (ts-object-mother)

> An ObjectMother support library to facilitate the easy creation of builders in TypeScript

[![npm package][npm-img]][npm-url]
[![Build Status][build-img]][build-url]
[![Downloads][downloads-img]][downloads-url]
[![Issues][issues-img]][issues-url]
[![Semantic Release][semantic-release-img]][semantic-release-url]

## Install

```bash
npm install ts-object-mother --save-dev
```

## Usage

The first step is to define a model

```ts
type Colour = 'Blue' | 'Red' | 'Yellow' | 'Green'

export type Shape = {
  name: string
  sides: number
  colour: Colour
}
```

Then define a builder for that model

```ts
import { randomElement, randomNumberBetween, randomString } from '@makerx/ts-object-mother'
import { DataBuilder, proxyBuilder } from '@makerx/ts-object-mother'
import { Shape } from './shape'

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

export const shapeBuilder = proxyBuilder<ShapeBuilder, Shape>(ShapeBuilder)
```

Then define a mother to build known models for testing

```ts
import { shapeBuilder } from './shape-builder'

export const shapeMother = {
  square: () => {
    return shapeBuilder().withName('Square').withSides(4).withColour('Blue')
  },
  triangle: () => {
    return shapeBuilder().withName('Triangle').withSides(3).withColour('Green')
  },
}
```

And write some tests

```ts
import { describe, expect, it } from '@jest/globals'
import { shapeMother } from './shape-mother'

describe('The square', () => {
  it('has four sides', () => {
    const shape = shapeMother.square().build()
    expect(shape.sides).toBe(4)
  })
  it('is named correctly', () => {
    const shape = shapeMother.square().build()
    expect(shape.name).toBe('Square Intercepted')
  })
  it('is coloured blue', () => {
    const shape = shapeMother.square().build()
    expect(shape.colour).toBe('Blue')
  })
})
```

Try it out on [StackBlitz](https://stackblitz.com/edit/node-au9p8x?file=shape.spec.ts)

[build-img]:https://github.com/MakerXStudio/ts-object-mother/actions/workflows/release.yml/badge.svg
[build-url]:https://github.com/MakerXStudio/ts-object-mother/actions/workflows/release.yml
[downloads-img]:https://img.shields.io/npm/dt/@MakerXStudio/ts-object-mother
[downloads-url]:https://www.npmtrends.com/@makerx/ts-object-mother
[npm-img]:https://img.shields.io/npm/v/@makerx/ts-object-mother
[npm-url]:https://www.npmjs.com/package/@makerx/ts-object-mother
[issues-img]:https://img.shields.io/github/issues/MakerXStudio/ts-object-mother
[issues-url]:https://github.com/MakerXStudio/ts-object-mother/issues
[semantic-release-img]:https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]:https://github.com/semantic-release/semantic-release
