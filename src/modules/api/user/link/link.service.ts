import { Link } from './../../../../schemas/link.schema';
import { LinkDTO } from './link.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class LinkService {
  constructor(@InjectModel(Link.name) private linkModel: Model<Link>) {}
  async getAllLinksOfUser(userId: string) {
    return await this.linkModel.find({ userId });
  }
  async create(linkDTO: LinkDTO, userId: string): Promise<LinkDTO> {
    const { name, status, customUrl, redirectsTo, inPool = false } = linkDTO;

    const newLink = new this.linkModel({
      userId: userId,
      name: name,
      customUrl: customUrl,
      redirectsTo: redirectsTo,
      status: status,
      inPool: inPool,
      createdAt: Date.now(),
    });
    const result = await newLink.save();
    return result as LinkDTO;
  }
}
