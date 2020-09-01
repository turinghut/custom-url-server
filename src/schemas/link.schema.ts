import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { LinkStatus } from 'src/models/link.model';

@Schema({ versionKey: 'false' })
export class Link extends Document {
  @Prop()
  name: string;

  @Prop({ require: true })
  userId: string;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  status: LinkStatus;

  @Prop()
  customUrl: string;

  @Prop({ required: true })
  redirectsTo: string;

  @Prop()
  inPool: boolean;
}

export const LinkSchema = SchemaFactory.createForClass(Link);
