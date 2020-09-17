import { Controller, Get, Param, Put, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { IResult } from 'src/common/interfaces/response';
import { UserDTO } from './user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put(':id')
  async updateUser(
    @Param('id') userId: string,
    @Body() userDTO: UserDTO,
  ): Promise<IResult<UserDTO>> {
    try {
      const updatedUser = await this.userService.update(userId, userDTO);
      if (updatedUser) {
        return {
          status: 'OK',
          result: {
            _id: updatedUser._id,
            emailAddress: updatedUser.emailAddress,
            phoneNumber: updatedUser.phoneNumber,
            joinedAt: updatedUser.joinedAt,
            name: updatedUser.name,
          } as UserDTO,
        };
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
}
