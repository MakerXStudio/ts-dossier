import { DataBuilder, dossierProxy, randomString } from '../../src'
import { MongooseModel } from '../model/mongoose-model'
import { Types } from 'mongoose'

export class MongooseModelBuilder extends DataBuilder<MongooseModel> {
  constructor() {
    super({
      name: randomString(10, 20),
      someId: new Types.ObjectId(),
    })
  }

  public withName(name: string) {
    return this.with('name', name + ' Intercepted')
  }
}

export const mongooseModelBuilder = dossierProxy<MongooseModelBuilder, MongooseModel>(MongooseModelBuilder)
