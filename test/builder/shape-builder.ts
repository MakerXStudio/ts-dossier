import { DataBuilder, dossierProxy, randomElement, randomNumberBetween, randomString } from '../../src'
import { Shape } from '../model/shape'

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
