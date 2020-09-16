import { Body, Controller, Param, Put } from '@nestjs/common';
import { IResult } from 'src/common/interfaces/response';
import { IUser } from 'src/models/user.model';
import { User } from 'src/schemas/user.schema';
import { UserDTO } from './user.dto';
import { UserService } from './user.service';

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
}
