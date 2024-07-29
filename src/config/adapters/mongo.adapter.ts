import mongoose, { Schema } from 'mongoose';

export class MongoAdapter {
  static omitSensitiveProperties(
    schema: Schema,
    sensitiveProperties: string[] = [],
  ) {
    schema.set('toJSON', {
      virtuals: true,
      versionKey: false,
      transform: function (_, ret) {
        delete ret._id;
        sensitiveProperties.forEach((property) => {
          delete ret[property];
        });
      },
    });
  }

  static isMongoID(id: string) {
    return mongoose.isValidObjectId(id);
  }

  static toMongoID(id: string) {
    return new mongoose.Types.ObjectId(id);
  }
}
