import { NextFunction, Request, Response } from 'express';
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { JwtAdapter } from 'src/config/adapters';
import { User } from 'src/data/schemas/user.schema';

import { EmailResponse } from 'src/interfaces/response.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @InjectModel(User.name)
    private UserModel: Model<User>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authorization = req.header('Authorization');
    if (!authorization) throw new UnauthorizedException('No token provided');
    if (!authorization.startsWith('Bearer '))
      throw new UnauthorizedException('Invalid Bearer token');

    const token = authorization.split(' ').at(1) || '';

    try {
      const payload = await JwtAdapter.validateToken<EmailResponse>(token);
      if (!payload) throw new UnauthorizedException('Invalid token');

      const user = await this.UserModel.findOne({ email: payload.email });
      if (!user) throw new UnauthorizedException('Invalid token - user');

      req.body.user = user;

      next();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
