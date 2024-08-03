import { BadRequestException, UnauthorizedException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtAdapter } from 'src/config/adapters';

import { User } from 'src/data/schemas/user.schema';
import { EmailResponse } from 'src/interfaces/response.interface';

export class ValidateEmail {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  public async execute(token: string) {
    const payload = await JwtAdapter.validateToken<EmailResponse>(token);

    if (!payload) throw new UnauthorizedException('Token inválido');

    const { email } = payload;
    if (!email)
      throw new BadRequestException('Email no encontrado en el token');

    const user = await this.userModel.findOne({ email });

    if (!user) throw new BadRequestException('Usuario no encontrado');

    await this.userModel.updateOne(
      { email: user.email },
      { emailValidated: true },
    );

    return {
      message: 'Usuario confirmado correctamente',
    };
  }
}
