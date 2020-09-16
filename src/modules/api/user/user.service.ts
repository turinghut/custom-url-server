import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { IUser } from 'src/models/user.model';
import { UserDTO } from './user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async update(userId: string, user: User): Promise<IUser> {
    const updatedUser = await this.userModel.findByIdAndUpdate(userId, user);
    return updatedUser as IUser;
  }
}
