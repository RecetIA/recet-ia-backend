import mongoose, { HydratedDocument } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { MongoAdapter } from 'src/config/adapters';

@Schema()
class Measure {
	@Prop({ type: String, required: [true, 'Full measure is required'] })
	full: string;

	@Prop({ type: String, required: [true, 'Short measure is required'] })
	short: string;
}

const MeasureSchema = SchemaFactory.createForClass(Measure);

@Schema()
export class Ingredient {
	@Prop({ type: String, required: [true, 'Name is required'] })
	name: string;

	@Prop({ type: MeasureSchema, required: [true, 'Measure is required'] })
	measure: Measure;

	@Prop({ type: Number, required: [true, 'Quantity is required'] })
	quantity: number;

	@Prop({ type: Boolean, default: false })
	isOptional: boolean;
}

const IngredientSchema = SchemaFactory.createForClass(Ingredient);

@Schema()
export class NutritionalValue {
	@Prop({ type: String, required: [true, 'Name is required'] })
	name: string;

	@Prop({ type: MeasureSchema, required: [true, 'Measure is required'] })
	measure: Measure;

	@Prop({ type: Number, required: [true, 'Quantity is required'] })
	quantity: number;
}

const NutritionalValueSchema = SchemaFactory.createForClass(NutritionalValue);

@Schema({ toJSON: { virtuals: true }, toObject: { virtuals: true } })
export class Nutritional {
	@Prop({ type: String, required: [true, 'Summary is required'] })
	summary: string;

	@Prop({ type: [NutritionalValueSchema] })
	values: NutritionalValue[];
}

const NutritionalSchema = SchemaFactory.createForClass(Nutritional);

@Schema()
export class RecipeInfo {
	@Prop({ type: Number, default: 0 })
	matchRate: number;

	@Prop({ type: String, required: [true, 'Title is required'] })
	title: string;

	@Prop({ type: String, required: [true, 'Description is required'] })
	description: string;

	@Prop({ type: Number, required: [true, 'Cook time is required'] })
	cookTimeInMins: number;

	@Prop({ type: Number, required: [true, 'Calories are required'] })
	calories: number;

	@Prop({ type: Number, required: [true, 'Servings are required'] })
	servings: number;

	@Prop({
		type: [IngredientSchema],
		required: [true, 'Ingredients are required'],
	})
	ingredients: Ingredient[];

	@Prop({ type: [String], required: [true, 'Steps are required'] })
	steps: string[];

	@Prop({
		type: NutritionalSchema,
		required: [true, 'Nutritional information is required'],
	})
	nutritional: Nutritional;

	@Prop({ type: String, default: '' })
	observations: string;
}

const RecipeInfoSchema = SchemaFactory.createForClass(RecipeInfo);

export type RecipeDocument = HydratedDocument<Recipe>;

@Schema({ timestamps: true })
export class Recipe {
	@Prop({ type: String, default: '' })
	observations: string;

	@Prop({ type: RecipeInfoSchema, required: [true, 'Recipe is required'] })
	recipe: RecipeInfo;

	@Prop({ type: String, default: '' })
	img: string;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
	creator: string;

	@Prop({ type: Boolean, default: false })
	isFavorite: boolean;
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);

MongoAdapter.omitSensitiveProperties(MeasureSchema, ['id']);
MongoAdapter.omitSensitiveProperties(IngredientSchema);
MongoAdapter.omitSensitiveProperties(NutritionalValueSchema, ['id']);
MongoAdapter.omitSensitiveProperties(NutritionalSchema, ['id']);
MongoAdapter.omitSensitiveProperties(RecipeInfoSchema, ['id']);
MongoAdapter.omitSensitiveProperties(RecipeSchema);
