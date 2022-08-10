# TypeScript Dossier (ts-dossier)

> A support library to facilitate the easy creation of builders for use with an Object-Mother test pattern in TypeScript

[![npm package][npm-img]][npm-url]
[![Build Status][build-img]][build-url]
[![Downloads][downloads-img]][downloads-url]
[![Issues][issues-img]][issues-url]
[![Semantic Release][semantic-release-img]][semantic-release-url]

## Install

```bash
npm install @makerx/ts-dossier --save-dev
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
import { randomElement, randomNumberBetween, randomString } from '@makerx/ts-dossier'
import { DataBuilder, proxyBuilder } from '@makerx/ts-dossier'
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

## Random Data Builders

Dossier come with a variety of random data builders - View detailed function descriptions includes arguments in the [code docs](https://makerxstudio.github.io/ts-dossier/docs/modules~data_utilties).

| Name                      | Function            | Other                                                                        |
|---------------------------|---------------------|------------------------------------------------------------------------------|
| Number                    | randomNumber        |                                                                              |
| Number between            | randomNumberBetween |                                                                              |
| Float between             | randomFloatBetween  |                                                                              |
| String                    | randomString        |                                                                              |
| ID                        | randomId            |                                                                              |
| Date                      | randomDate          |                                                                              |
| Date between              | randomDateBetween   |                                                                              |
| Boolean                   | randomBoolean       |                                                                              |
| Incremented number        | incrementedNumber   | Returns a unique incremented number. Call `resetIncrementedNumbers` to reset |
| Element from a collection | randomElement       |                                                                              |
| Name of a thing           | randomThingName     |                                                                              |
| Name of a person          | randomPersonName    |                                                                              |
| Email                     | randomEmail         |                                                                              |
| Phone number              | randomPhoneNumber   |                                                                              |
| URL                       | randomUrl           |                                                                              |


[build-img]:https://github.com/MakerXStudio/ts-dossier/actions/workflows/release.yml/badge.svg
[build-url]:https://github.com/MakerXStudio/ts-dossier/actions/workflows/release.yml
[downloads-img]:https://img.shields.io/npm/dt/@MakerXStudio/ts-dossier
[downloads-url]:https://www.npmtrends.com/@makerx/ts-dossier
[npm-img]:https://img.shields.io/npm/v/@makerx/ts-dossier
[npm-url]:https://www.npmjs.com/package/@makerx/ts-dossier
[issues-img]:https://img.shields.io/github/issues/MakerXStudio/ts-dossier
[issues-url]:https://github.com/MakerXStudio/ts-dossier/issues
[semantic-release-img]:https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]:https://github.com/semantic-release/semantic-release
