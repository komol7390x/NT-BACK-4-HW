import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
  virtuals: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Saller extends Document {
  @Prop({ required: true, type: String })
  full_name: string;

  @Prop({ required: true, unique: true, type: String })
  email: string;

  @Prop({ required: true, type: Number })
  age: number;

  @Prop({ type: Number, required: false, default: 0 })
  balance: number;
}
const SallerSchema = SchemaFactory.createForClass(Saller);

SallerSchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'saller_id',
});

export { SallerSchema };