import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/schemas/user.schema';
import { IResult } from 'src/common/interfaces/response';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() user: User) {
    user.joinedAt = new Date();
    const newUser = await this.userService.createUser(user);
    if (newUser) {
      const resp: IResult<unknown> = {
        status: 'OK',
        result: newUser,
      };
      return resp;
    }
    const errResp: IResult<unknown> = {
      status: 'NOT OK',
      error: 'User not created',
      result: null,
    };
    return errResp;
  }
}
