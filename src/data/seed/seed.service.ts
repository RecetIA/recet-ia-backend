import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Recipe } from '../schemas/recipe.schema';
import { User } from '../schemas/user.schema';
import { seedData } from './data';

import { Calculations } from 'src/config/utils';

import { Model } from 'mongoose';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Recipe.name) private recipeModel: Model<Recipe>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async seed() {
    await Promise.all([
      this.recipeModel.deleteMany({}),
      this.userModel.deleteMany({}),
    ]);

    const users = await this.userModel.insertMany(seedData.users);

    await this.recipeModel.insertMany(
      seedData.recipes.map((recipe) => ({
        ...recipe,
        creator: users.at(
          Calculations.randomBeetween0AndX(seedData.users.length - 1),
        )?.id,
      })),
    );
    console.log('Seeding completed');
  }
}
