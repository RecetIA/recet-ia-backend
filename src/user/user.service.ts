import { Injectable } from '@nestjs/common';
import { UserResponse } from 'src/interfaces/user.interface';

@Injectable()
export class UserService {
  getProfile(user: UserResponse) {
    return user;
  }
}
