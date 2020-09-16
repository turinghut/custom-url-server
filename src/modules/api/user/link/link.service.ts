import { Link } from './../../../../schemas/link.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ILink, LinkStatus } from 'src/models/link.model';

@Injectable()
export class LinkService {
  constructor(@InjectModel(Link.name) private linkModel: Model<Link>) {}

  async getAllLinksOfUser(userId: string) {
    return await this.linkModel.find({ userId });
  }

  async create(linkData: ILink, userId: string): Promise<ILink> {
    const { name, customUrl, redirectsTo, inPool = false } = linkData;
    const newLink = new this.linkModel({
      userId: userId,
      name: name,
      customUrl: customUrl,
      redirectsTo: redirectsTo,
      status: LinkStatus.active,
      inPool: inPool,
      createdAt: Date.now(),
    });
    const result = await newLink.save();
    return result as ILink;
  }
}
