import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ChangePasswordDto } from '../dto/change-password.dto';
import { BcryptAdapter, JwtAdapter } from 'src/config/adapters';
import { User } from 'src/data/schemas/user.schema';
import { EmailResponse } from 'src/interfaces/response.interface';

@Injectable()
export class ChangePassword {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async execute(token: string, changePasswordDto: ChangePasswordDto) {
    const payload = await JwtAdapter.validateToken<EmailResponse>(token);

    if (!payload) throw new UnauthorizedException('Token inválido');

    const { email } = payload;
    if (!email)
      throw new BadRequestException('Email no encontrado en el token');

    const user = await this.userModel.findOne({ email });
    if (!user) throw new BadRequestException('Usuario no encontrado');

    const password = BcryptAdapter.hash(changePasswordDto.newPassword);
    console.log(password);
    await this.userModel.updateOne({ email: user.email }, { password });

    return {
      message: 'Password modificado correctamente',
    };
  }
}
