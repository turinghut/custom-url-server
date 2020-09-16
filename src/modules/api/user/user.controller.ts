import { Controller, Post, Body, Get, Param } from '@nestjs/common';

import { UserService } from './user.service';
import { IResult } from 'src/common/interfaces/response';
import { UserDTO } from './user.dto';
import { User } from 'src/schemas/user.schema';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() user: User): Promise<IResult<UserDTO>> {
    try {
      user.joinedAt = new Date();
      const newUser = await this.userService.createUser(user);
      if (newUser) {
        return {
          status: 'OK',
          result: {
            _id: newUser._id,
            emailAddress: newUser.emailAddress,
            phoneNumber: newUser.phoneNumber,
            name: newUser.name,
            joinedAt: newUser.joinedAt,
          } as UserDTO,
        } as IResult<UserDTO>;
      }
      return {
        status: 'NOT OK',
        error: 'An error occured',
      } as IResult<UserDTO>;
    } catch (error) {
      return {
        status: 'NOT OK',
        error: error.message,
      } as IResult<UserDTO>;
    }
  }
}
