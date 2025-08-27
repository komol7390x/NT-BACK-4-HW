import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Admin extends Document {
  @Prop({ required: true, type: String })
  full_name: string;

  @Prop({ required: true, unique: true, type: String })
  email: string;

  @Prop({ required: true, type: Number })
  age: number;
}
export const AdminSchema = SchemaFactory.createForClass(Admin);
