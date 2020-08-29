import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/schemas/user.schema';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() user: User) {
    user.joinedAt = new Date();
    const newUser = await this.userService.createUser(user);
    if (newUser) {
      return {
        status: 'OK',
        result: newUser,
      };
    }
    return {
      status: 'NOT OK',
      message: 'User not created',
    };
  }
}
