import { Types } from 'mongoose'

export type MongooseModel = {
  name: string
  someId: Types.ObjectId
}
