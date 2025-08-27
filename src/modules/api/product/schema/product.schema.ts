import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Product {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Number, default: 0 })
  stock_quantity: number;

  @Prop({ type: String, required: true })
  price: string;

  @Prop({ type: String, required: true })
  saller_id: string;

  @Prop({ type: String, required: true })
  category_id: string;

  @Prop({ type: Array, default: () => [] })
  image_url: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
