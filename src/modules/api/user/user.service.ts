import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { UserDTO } from './user.dto';
import { IUser } from 'src/models/user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(user: User): Promise<UserDTO> {
    let newUser = new this.userModel(user);
    newUser = await newUser.save();
    return newUser as UserDTO;
  }

  async getUserById(id: string): Promise<IUser> {
    const user = await this.userModel.findById(id);
    return user as IUser;
  }
}
