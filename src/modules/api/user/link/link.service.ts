import { Injectable } from '@nestjs/common';
import { Link } from 'src/schemas/link.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class LinkService {
  constructor(@InjectModel(Link.name) private linkModel: Model<Link>) {}
  async getAllLinksOfUser(userId) {
    return await this.linkModel.find({ userId });
  }
}

