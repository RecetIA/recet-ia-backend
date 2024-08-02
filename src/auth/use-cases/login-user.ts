import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { LoginUserDto } from '../dto/login-user.dto';

import { User } from 'src/data/schemas/user.schema';
import { BcryptAdapter, JwtAdapter } from 'src/config/adapters';

type ComparePassword = (password: string, hash: string) => boolean;
type GenerateToken = (payload: any, duration?: string) => Promise<string>;

@Injectable()
export class LoginUser {
  private comparePassword: ComparePassword = BcryptAdapter.compare;
  private generateToken: GenerateToken = JwtAdapter.generateToken;

  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<User>,
  ) {}

  async execute(loginUserDto: LoginUserDto) {
    const user = await this.UserModel.findOne({ email: loginUserDto.email });

    if (!user) {
      throw new BadRequestException('El usuario no existe');
    }

    const isValidPassword = await this.comparePassword(
      loginUserDto.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new BadRequestException('Credenciales invalidas');
    }

    try {
      const token = await this.generateToken({
        email: user.email,
      });

      return {
        user,
        token,
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al generar el token');
    }
  }
}
