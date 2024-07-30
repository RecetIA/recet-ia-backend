import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Recipe } from './recipe.schema';

import { MongoAdapter } from 'src/config/adapters';

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, required: [true, 'Name is required'] })
  name: string;

  @Prop({ type: String, unique: true, required: [true, 'Email is required'] })
  email: string;

  @Prop({ type: Boolean, default: false })
  emailValidated: boolean;

  @Prop({ type: String, required: [true, 'Password is required'] })
  password: string;

  @Prop({
    type: [String],
    enum: ['ADMIN_ROLE', 'USER_ROLE'],
    default: 'USER_ROLE',
  })
  role: string[];

  @Prop({ type: String, trim: true, default: null })
  img: string;

  @Prop({ type: Recipe, default: [] })
  favoriteRecipe: Recipe[];
}

export const UserSchema = SchemaFactory.createForClass(User);
MongoAdapter.omitSensitiveProperties(UserSchema, ['password']);

export type UserDocument = User & Document;
