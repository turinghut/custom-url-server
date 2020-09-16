import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from 'src/schemas/user.schema';
import { IUser } from 'src/models/user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(user: User): Promise<IUser> {
    let newUser = new this.userModel(user);
    newUser = await newUser.save();
    return newUser as IUser;
  }
}
