import { LinkDTO } from './link.dto';
import { Injectable } from '@nestjs/common';
import { Link } from 'src/schemas/link.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class LinkService {
  constructor(@InjectModel(Link.name) private linkModel: Model<Link>) { }

  async create(
    name: any,
    status: any,
    customUrl: any,
    redirectsTo: any,
    inPool: any,
    userId: any,
  ): Promise<LinkDTO> {
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
