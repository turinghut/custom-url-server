import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { IResult } from 'src/common/interfaces/response';
import { UserDTO } from './user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUserById(@Param('id') id) {
    try {
      const user = await this.userService.getUserById(id);
      if (user) {
        const userResp: UserDTO = {
          name: user.name,
          _id: user._id,
          emailAddress: user.emailAddress,
          joinedAt: user.joinedAt,
          phoneNumber: user.phoneNumber,
        };
        const resp: IResult<UserDTO> = {
          status: 'OK',
          result: userResp,
        };
        return resp;
      }
      const errResp: IResult<UserDTO> = {
        status: 'NOT OK',
        error: 'User not found',
        result: null,
      };
      return errResp;
    } catch (err) {
      const errResp: IResult<UserDTO> = {
        status: 'NOT OK',
        error: 'An error occurred',
        result: null,
      };
      return errResp;
    }
  }
}
