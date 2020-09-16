import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { IResult } from 'src/common/interfaces/response';
import { UserDTO } from './user.dto';

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
}
