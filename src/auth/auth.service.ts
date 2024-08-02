import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ChangePasswordDto } from './dto/change-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

import { User, UserDocument } from 'src/data/schemas/user.schema';
import { EmailService } from 'src/services/email.service';

import { RegisterUser } from './use-cases/register-user';
import { LoginUser } from './use-cases/login-user';
import { ChangePassword } from './use-cases/change-password';
import { ResetPassword } from './use-cases/reset-password';
import { ValidateEmail } from './use-cases/validate-email';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(User.name)
		private userModel: Model<UserDocument>,
		private emailService: EmailService,
	) {}

	async login(loginUserDto: LoginUserDto) {
		return await new LoginUser(this.userModel).execute(loginUserDto);
	}

	async register(registerUserDto: RegisterUserDto) {
		return await new RegisterUser(this.userModel, this.emailService).execute(
			registerUserDto,
		);
	}

	async changePassword(email: string, changePasswordDto: ChangePasswordDto) {
		return await new ChangePassword(this.userModel).execute(
			email,
			changePasswordDto,
		);
	}

	async resetPassword(resetPasswordDto: ResetPasswordDto) {
		return await new ResetPassword(this.userModel, this.emailService).execute(
			resetPasswordDto,
		);
	}

	async validateEmail(email: string) {
		return await new ValidateEmail(this.userModel).execute(email);
	}
}
