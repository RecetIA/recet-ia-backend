import { Controller, Post, Body, Req, Get, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';

import {
  ChangePasswordDto,
  LoginUserDto,
  RegisterUserDto,
  ResetPasswordDto,
} from './dto';

import { AuthGuard } from './guards/auth.guard';
import { User } from 'src/interfaces/user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('validate-email')
  @UseGuards(AuthGuard)
  validateEmail(@Req() req: Request) {
    const { user } = req.body as unknown as User;

    return this.authService.validateEmail(user.email);
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
    const { user } = req.body as unknown as User;

    return this.authService.changePassword(user.email, changePasswordDto);
  }

  @Post('reset-password')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }
}
