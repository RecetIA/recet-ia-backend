import {
	Injectable,
	BadRequestException,
	InternalServerErrorException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ChangePasswordDto } from './dto/change-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

import { BcryptAdapter, JwtAdapter } from 'src/config/adapters';

import { User, UserDocument } from 'src/data/schemas/user.schema';

type HashPassword = (password: string) => string;
type ComparePassword = (password: string, hash: string) => boolean;

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(User.name)
		private UserModel: Model<UserDocument>,
	) {}

	private comparePassword: ComparePassword = BcryptAdapter.compare;
	private hashPasword: HashPassword = BcryptAdapter.hash;

	async login(loginUserDto: LoginUserDto) {
		const user = await this.UserModel.findOne({ email: loginUserDto.email });

		if (!user) {
			throw new BadRequestException('Credenciales invalidas');
		}

		const isValidPassword = await this.comparePassword(
			loginUserDto.password,
			user.password,
		);

		if (!isValidPassword) {
			throw new BadRequestException('Credenciales invalidas');
		}

		const token = await JwtAdapter.generateToken({
			email: user.email,
		});

		if (!token) {
			throw new InternalServerErrorException('Error al generar el token');
		}

		return {
			user,
			token,
		};
	}

	async register(registerUserDto: RegisterUserDto) {
		const user = await this.UserModel.findOne({ email: registerUserDto.email });

		if (user) {
			throw new BadRequestException('El correo ya esta en uso');
		}

		const passwordHash = this.hashPasword(registerUserDto.password);
		const newUser = new this.UserModel({
			...registerUserDto,
			password: passwordHash,
		});

		const token = await JwtAdapter.generateToken({ email: newUser.email });

		if (!token) {
			throw new InternalServerErrorException('Error al generar el token');
		}

		await newUser.save();

		return {
			message: 'Te has registrado exitosamente',
		};
	}

	//TODO: Function to change password
	changePassword(changePasswordDto: ChangePasswordDto) {}

	//TODO: Function to reset password
	resetPassword(resetPasswordDto: ResetPasswordDto) {}
}
