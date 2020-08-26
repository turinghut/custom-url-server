import { Controller } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users/:id')
export class UserController {
  constructor(private userService: UserService) {}
}
