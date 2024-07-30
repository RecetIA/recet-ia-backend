import {
	Injectable,
	BadRequestException,
	InternalServerErrorException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from 'src/data/schemas/user.schema';
import { BcryptAdapter, JwtAdapter } from 'src/config/adapters';
import { RegisterUserDto } from '../dto/register-user.dto';

type HashPassword = (password: string) => string;
type GenerateToken = (payload: any, duration?: string) => Promise<string>;

@Injectable()
export class RegisterUser {
	private hashPasword: HashPassword = BcryptAdapter.hash;
	private generateToken: GenerateToken = JwtAdapter.generateToken;

	constructor(
		@InjectModel(User.name)
		private readonly UserModel: Model<User>,
	) {}

	async execute(registerUserDto: RegisterUserDto) {
		const user = await this.UserModel.findOne({ email: registerUserDto.email });

		if (user) {
			throw new BadRequestException('El correo ya esta en uso');
		}

		const passwordHash = await this.hashPasword(registerUserDto.password);
		const newUser = new this.UserModel({
			...registerUserDto,
			password: passwordHash,
		});

		const token = await this.generateToken({ email: newUser.email });

		if (!token) {
			throw new InternalServerErrorException('Error al generar el token');
		}

		await newUser.save();

		return {
			message: 'Te has registrado exitosamente',
		};
	}
}
