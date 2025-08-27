import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Product {
  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({ type: Number, default: 0 })
  stock_quantity: number;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Saller' })
  saller_id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category_id: string;

  @Prop({ type: Array, default: () => [] })
  image_url: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
