import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ChangePasswordDto } from '../dto/change-password.dto';
import { BcryptAdapter } from 'src/config/adapters';
import { User } from 'src/data/schemas/user.schema';

type Hash = (password: string) => string;

@Injectable()
export class ChangePassword {
	private hashPassword: Hash = BcryptAdapter.hash;

	constructor(
		@InjectModel(User.name)
		private readonly UserModel: Model<User>,
	) {}

	async execute(email: string, changePasswordDto: ChangePasswordDto) {
		const user = await this.UserModel.findOne({ email });
		if (!user) {
			throw new InternalServerErrorException('Usuario no encontrado');
		}

		const password = this.hashPassword(changePasswordDto.password);
		await this.UserModel.findOneAndUpdate({ email: user.email }, { password });

		return {
			message: 'Password modificado correctamente',
		};
	}
}
