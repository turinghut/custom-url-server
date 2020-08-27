import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { LinkStatus } from 'src/models/link.model';

@Schema()
export class Link extends Document {
  @Prop()
  name: string;

  @Prop()
  userId: string;

  @Prop()
  createdAt: Date;

  @Prop()
  status: string;

  @Prop()
  customUrl: string;

  @Prop()
  redirectsTo: string;

  @Prop()
  inPool: boolean;
}

export const LinkSchema = SchemaFactory.createForClass(Link);
