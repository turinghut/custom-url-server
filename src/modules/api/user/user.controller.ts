import { Controller, Post, Body, Get, Param } from '@nestjs/common';

import { UserService } from './user.service';
import { IResult } from 'src/common/interfaces/response';
import { UserDTO } from './user.dto';
import { IUser } from 'src/models/user.model';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<IResult<UserDTO>> {
    try {
      const user = await this.userService.getUserById(id);
      if (user) {
        return {
          status: 'OK',
          result: {
            _id: user._id,
            emailAddress: user.emailAddress,
            phoneNumber: user.phoneNumber,
            name: user.name,
            joinedAt: user.joinedAt,
          } as UserDTO,
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

  @Post()
  async createUser(@Body() user: IUser): Promise<IResult<UserDTO>> {
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
      throw 'An error occured';
    } catch (error) {
      return {
        status: 'NOT OK',
        error: error.message,
      } as IResult<UserDTO>;
    }
  }
}
