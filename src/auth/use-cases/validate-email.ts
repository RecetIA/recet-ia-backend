import { BadRequestException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from 'src/data/schemas/user.schema';

export class ValidateEmail {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  public async execute(email: string) {
    console.log(email);

    if (!email)
      throw new BadRequestException('Email no encontrado en el token');

    const user = await this.userModel.findOne({ email });

    if (!user) throw new BadRequestException('Usuario no encontrado');

    await this.userModel.findOneAndUpdate(
      { email: user.email },
      { emailValidated: true },
    );

    return {
      message: 'Usuario confirmado correctamente',
    };
  }
}
