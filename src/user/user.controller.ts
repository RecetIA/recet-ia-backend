import { Controller, Get, Req } from '@nestjs/common';

import { UserService } from './user.service';
import { User } from 'src/interfaces/user.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  getProfile(@Req() req: Request) {
    const { user } = req.body as unknown as User;

    return this.userService.getProfile(user);
  }
}
