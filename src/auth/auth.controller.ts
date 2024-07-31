import {
	Controller,
	Post,
	Body,
	UsePipes,
	ValidationPipe,
	Req,
	Get,
	UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';

import { ChangePasswordDto } from './dto/change-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from './guards/auth.guard';

@UsePipes(ValidationPipe)
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Get('validate-email')
	@UseGuards(AuthGuard)
	validateEmail(@Req() req: Request) {
		return this.authService.validateEmail((req as any).body.user.email);
	}

	@Post('login')
	login(@Body() loginUserDto: LoginUserDto) {
		return this.authService.login(loginUserDto);
	}

	@Post('register')
	async register(@Body() registerUserDto: RegisterUserDto) {
		return await this.authService.register(registerUserDto);
	}

	@Post('change-password')
	@UseGuards(AuthGuard)
	changePassword(
		@Body() changePasswordDto: ChangePasswordDto,
		@Req() req: Request,
	) {
		return this.authService.changePassword(
			(req as any).body.user.email,
			changePasswordDto,
		);
	}

	@Post('reset-password')
	resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
		return this.authService.resetPassword(resetPasswordDto);
	}
}
