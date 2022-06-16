import { shapeBuilder } from '../builder/shape-builder'

export const shapeMother = {
  square: () => {
    return shapeBuilder().withName('Square').withSides(4).withColour('Blue')
  },
  triangle: () => {
    return shapeBuilder().withName('Triangle').withSides(3).withColour('Green')
  },
}
