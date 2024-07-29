import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateRecipeDto } from './dto/create-recipe.dto';
import { Recipe } from 'src/data/schemas/recipe.schema';

import { Model } from 'mongoose';

@Injectable()
export class RecipeService {
  constructor(@InjectModel(Recipe.name) private recipeModel: Model<Recipe>) {}

  create(createRecipeDto: CreateRecipeDto) {
    return 'This action adds a new recipe + ' + createRecipeDto;
  }

  async findAll() {
    console.log(await this.recipeModel.find().exec());
    return await this.recipeModel.find().exec();
  }

  async findOne(id: string) {
    console.log(await this.recipeModel.findById(id).exec());
    return this.recipeModel.findById(id).exec();
  }
}
