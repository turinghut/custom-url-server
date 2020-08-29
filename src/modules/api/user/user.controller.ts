import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  async getUserData(@Param() params) {
    const user = await this.userService.getUserById(params.id);
    if (user) {
      return {
        status: 'OK',
        result: JSON.stringify(user),
      };
    }
    return {
      status: 'NOT OK',
      message: 'User Not Found',
    };
  }
}
