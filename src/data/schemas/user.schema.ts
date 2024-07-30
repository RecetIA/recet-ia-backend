import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MongoAdapter } from 'src/config/adapters';

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, required: [true, 'Name is required'] })
  name: string;

  @Prop({ type: String, unique: true, required: [true, 'Email is required'] })
  email: string;

  @Prop({ type: String, required: [true, 'Password is required'] })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
MongoAdapter.omitSensitiveProperties(UserSchema, ['password']);

export type UserDocument = User & Document;
