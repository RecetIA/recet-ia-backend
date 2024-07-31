import {
	Injectable,
	BadRequestException,
	InternalServerErrorException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BcryptAdapter, JwtAdapter } from 'src/config/adapters';

import { RegisterUserDto } from '../dto/register-user.dto';
import { EmailService } from 'src/services/email.service';
import { User } from 'src/data/schemas/user.schema';

import { envs } from 'src/config/envs';

type HashPassword = (password: string) => string;
type GenerateToken = (payload: any, duration?: string) => Promise<string>;

@Injectable()
export class RegisterUser {
	private hashPasword: HashPassword = BcryptAdapter.hash;
	private generateToken: GenerateToken = JwtAdapter.generateToken;

	constructor(
		@InjectModel(User.name)
		private readonly userModel: Model<User>,
		private readonly emailService: EmailService,
	) {}

	private sendUserValidation = async (email: string, userName: string) => {
		const token = await this.generateToken({ email });

		if (!token)
			throw new InternalServerErrorException(
				'Error generando token de validación de cuenta',
			);

		const link = `${envs.FRONTEND_URL}/auth/confirmar/${token}`;

		const htmlBody = `
      <p>Hola: ${userName}, comprueba tu cuenta en RecetIA</p>
      <p>
        Tu cuenta ya está casi lista, solo debes comprobarla  en siguiente enlace:
        <a href="${link}">Comprobar Cuenta</a>
      </p>

      <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
    `;

		const options = {
			from: envs.MAILER_EMAIL,
			to: email,
			subject: 'RecetIA - Genera tus recetas',
			htmlBody,
		};

		const isSent = await this.emailService.sendEmail(options);
		console.log(isSent);

		if (!isSent)
			throw new InternalServerErrorException(
				'Error al enviar correo de validación de cuenta',
			);

		return true;
	};

	async execute(registerUserDto: RegisterUserDto) {
		const user = await this.userModel.findOne({ email: registerUserDto.email });

		if (user) {
			throw new BadRequestException('Usuario ya registrado');
		}

		const passwordHash = this.hashPasword(registerUserDto.password);

		const createdUser = new this.userModel({
			...registerUserDto,
			password: passwordHash,
		});

		createdUser.save();

		try {
			await this.sendUserValidation(
				registerUserDto.email,
				registerUserDto.name,
			);

			return {
				message:
					'Usuario creado correctamente, revisa tu email para confirmar tu cuenta',
			};
		} catch (error) {
			console.log(error);
			throw new InternalServerErrorException(error);
		}
	}
}
