import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ChangePasswordDto } from './dto/change-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

import { User, UserDocument } from 'src/data/schemas/user.schema';
import { LoginUser } from './use-cases/login-user';
import { EmailService } from 'src/email/email.service';
import { RegisterUser } from './use-cases/register-user';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(User.name)
		private UserModel: Model<UserDocument>,
		private emailService: EmailService,
	) {}

	async login(loginUserDto: LoginUserDto) {
		return await new LoginUser(this.UserModel).execute(loginUserDto);
	}

	async register(registerUserDto: RegisterUserDto) {
		return await new RegisterUser(this.UserModel).execute(registerUserDto);
	}

	//TODO: Function to change password
	changePassword(changePasswordDto: ChangePasswordDto) {}

	//TODO: Function to reset password
	resetPassword(resetPasswordDto: ResetPasswordDto) {}
}
