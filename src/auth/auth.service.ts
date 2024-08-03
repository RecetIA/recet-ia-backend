import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ChangePasswordDto } from './dto/change-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

import { User, UserDocument } from 'src/data/schemas/user.schema';
import { EmailService } from 'src/services/email.service';

import {
  ChangePassword,
  CheckUserToken,
  LoginUser,
  RegisterUser,
  ResetPassword,
  ValidateEmail,
} from './use-cases';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private emailService: EmailService,
  ) {}

  async validateEmail(token: string) {
    return await new ValidateEmail(this.userModel).execute(token);
  }

  async login(loginUserDto: LoginUserDto) {
    return await new LoginUser(this.userModel).execute(loginUserDto);
  }

  async register(registerUserDto: RegisterUserDto) {
    return await new RegisterUser(this.userModel, this.emailService).execute(
      registerUserDto,
    );
  }

  async checkUserToken(token: string) {
    return await new CheckUserToken(this.userModel).execute(token);
  }

  async changePassword(token: string, changePasswordDto: ChangePasswordDto) {
    return await new ChangePassword(this.userModel).execute(
      token,
      changePasswordDto,
    );
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    return await new ResetPassword(this.userModel, this.emailService).execute(
      resetPasswordDto,
    );
  }
}
