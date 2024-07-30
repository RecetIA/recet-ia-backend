import {
	Controller,
	Post,
	Body,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { ChangePasswordDto } from './dto/change-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@UsePipes(ValidationPipe)
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	login(@Body() loginUserDto: LoginUserDto) {
		return this.authService.login(loginUserDto);
	}

	@Post('register')
	register(@Body() registerUserDto: RegisterUserDto) {
		return this.authService.register(registerUserDto);
	}

	@Post('change-password')
	changePassword(@Body() changePasswordDto: ChangePasswordDto) {
		return this.authService.changePassword(changePasswordDto);
	}

	@Post('reset-password')
	resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
		return this.authService.resetPassword(resetPasswordDto);
	}
}
