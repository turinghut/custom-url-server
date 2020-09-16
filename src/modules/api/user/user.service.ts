import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { UserDTO } from './user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(user: User): Promise<UserDTO> {
    const newUser = new this.userModel(user);
    await newUser.save();
    return newUser as UserDTO;
  }

  async getUserById(id: string): Promise<UserDTO> {
    const user = await this.userModel.findById(id);
    return user as UserDTO;
  }
}
