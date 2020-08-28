import { Injectable } from '@nestjs/common';
import { Link } from 'src/schemas/link.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ILink } from 'src/models/link.model';

@Injectable()
export class LinkService {
  constructor(@InjectModel(Link.name) private linkModel: Model<Link>) {}

  async create(body, userId): Promise<any> {
    const newLink = new this.linkModel({
      userId: userId,
      name: body['name'],
      customUrl: body['customUrl'],
      redirectTo: body['redirectTo'],
      status: body['status'],
      inPool: body['inPool'],
      createdAt: Date.now(),
     
    });
    const result = await newLink.save();

    return result;
  }
}


/*


E:\custom-url-server\src\modules\api\user\link\link.controller.ts
  7:3   warning  Missing return type on function    @typescript-eslint/explicit-module-boundary-types
  8:15  warning  Argument 'body' should be typed    @typescript-eslint/explicit-module-boundary-types
  8:15  warning  Argument 'params' should be typed  @typescript-eslint/explicit-module-boundary-types

E:\custom-url-server\src\modules\api\user\link\link.service.ts
  10:15  warning  Argument 'body' should be typed    @typescript-eslint/explicit-module-boundary-types
  10:15  warning  Argument 'userId' should be typed  @typescript-eslint/explicit-module-boundary-types

E:\custom-url-server\src\schemas\link.schema.ts
  3:10  warning  'LinkStatus' is defined but never used  @typescript-eslint/no-unused-vars

*/