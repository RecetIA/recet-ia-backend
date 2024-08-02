import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ResetPasswordDto } from '../dto/reset-password.dto';
import { User } from 'src/data/schemas/user.schema';

import { JwtAdapter } from 'src/config/adapters';
import { envs } from 'src/config/envs';

import { EmailService } from 'src/services/email.service';

type GenerateToken = (payload: any, duration?: string) => Promise<string>;

export class ResetPassword {
  private generateToken: GenerateToken = JwtAdapter.generateToken;

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private emailService: EmailService,
  ) {}

  private async sendPasswordValidation(email: string, userName: string) {
    const token = await this.generateToken({ email });
    if (!token)
      throw new InternalServerErrorException(
        'Error generando token de cambio de contraseña',
      );

    const link = `${envs.FRONTEND_URL}/auth/olvide-password/${token}`;

    const htmlBody = /*html*/ `
			<p>Hola: ${userName}, ¿olvidaste tu contraseña?</p>
			<p>
				Para cambiar tu contraseña, haz click en el siguiente enlace:
				<a href="${link}">Cambiar Contraseña</a>
			</p>

			<p>Si tu no solicitaste este cambio, puedes ignorar este mensaje</p>
		`;

    const options = {
      from: envs.MAILER_EMAIL,
      to: email,
      subject: 'RecetIA - Cambio de Contraseña',
      htmlBody,
    };

    const isSent = await this.emailService.sendEmail(options);
    if (!isSent)
      throw new InternalServerErrorException(
        'Error enviando email de cambio de contraseña',
      );

    return true;
  }

  public async execute(resetPasswordDto: ResetPasswordDto) {
    const user = await this.userModel.findOne({
      email: resetPasswordDto.email,
    });

    if (!user) throw new BadRequestException('El usuario no existe');

    await this.sendPasswordValidation(user.email, user.name);

    try {
      return {
        message: 'Hemos enviado un email con las instrucciones',
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
