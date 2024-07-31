import { BadRequestException, UnauthorizedException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from 'src/data/schemas/user.schema';
import { JwtAdapter } from 'src/config/adapters';

type ValidateToken<T> = (token: string) => Promise<T | null>;

interface EmailResponse {
	email: string;
}

export class CheckUserToken {
	private validateToken: ValidateToken<EmailResponse> =
		JwtAdapter.validateToken;

	constructor(
		@InjectModel(User.name)
		private readonly UserModel: Model<User>,
	) {}

	public async execute(token: string) {
		const payload = await this.validateToken(token);
		if (!payload) throw new UnauthorizedException('Token inválido');

		const { email } = payload;
		if (!email)
			throw new BadRequestException('Email no encontrado en el token');

		const user = await this.UserModel.findOne({ email });
		if (!user) throw new BadRequestException('Usuario no encontrado');

		return {
			message: 'Token válido',
		};
	}
}
