import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { RecipeModule } from './recipe/recipe.module';
import { AuthModule } from './auth/auth.module';
import { SeedModule } from './data/seed/seed.module';

import { User, UserSchema } from './data/schemas/user.schema';
import { AuthMiddleware } from './middlewares/auth/auth.middleware';
import { envs } from './config/envs';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(envs.MONGO_URL),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    RecipeModule,
    AuthModule,
    SeedModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('recipe', 'user');
  }
}
