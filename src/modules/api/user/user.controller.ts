import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { IResult } from 'src/common/interfaces/response';
import { UserDTO } from './user.dto';
import { User } from 'src/schemas/user.schema';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
  
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<IResult<UserDTO>> {
    try {
      const user = await this.userService.getUserById(id);
      if (user) {
        return {
          status: 'OK',
          result: user,
        } as IResult<UserDTO>;
      }
      return {
        status: 'NOT OK',
        error: 'User not found',
      } as IResult<UserDTO>;
    } catch (err) {
      return {
        status: 'NOT OK',
        error: err.message,
      } as IResult<UserDTO>;
    }
  }
}
