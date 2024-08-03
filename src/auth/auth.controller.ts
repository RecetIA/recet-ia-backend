import { Controller, Post, Body, Get, Param } from '@nestjs/common';

import { AuthService } from './auth.service';

import {
  ChangePasswordDto,
  LoginUserDto,
  RegisterUserDto,
  ResetPasswordDto,
} from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('validate-email/:token')
  validateEmail(@Param('token') token: string) {
    return this.authService.validateEmail(token);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return await this.authService.register(registerUserDto);
  }

  @Get('change-password/:token')
  checkUserToken(@Param('token') token: string) {
    return this.authService.checkUserToken(token);
  }

  @Post('change-password/:token')
  changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Param('token') token: string,
  ) {
    return this.authService.changePassword(token, changePasswordDto);
  }

  @Post('reset-password')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }
}
