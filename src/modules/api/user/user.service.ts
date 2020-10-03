import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from 'src/schemas/user.schema';
import { IUser } from 'src/models/user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async update(userId: string, user: IUser): Promise<IUser> {
    const updatedUser = await this.userModel.findByIdAndUpdate(userId, user);
    return updatedUser as IUser;
  }

  async getUserById(id: string): Promise<IUser> {
    const user = await this.userModel.findById(id);
    return user as IUser;
  }
}
