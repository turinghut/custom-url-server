import { Injectable } from '@nestjs/common';
import { Link } from 'src/schemas/link.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class LinkService {
  constructor(@InjectModel(Link.name) private linkModel: Model<Link>) { }

  async create(body,userId): Promise<any> {
    const newLink = new this.linkModel({
      userId:userId,
      name: body['name'],
      customUrl: body['customUrl'],
      redirectTo: body['redirectTo'],
      status: body['status'],
      inPool: body['inPool'],
      createdAt: Date.now(),

    })
    const result = await newLink.save();
    
    return result;
  }
}
