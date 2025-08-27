import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
  virtuals: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Category {
  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({ type: String, default: 0 })
  image_url?: string;
}

const CategorySchema = SchemaFactory.createForClass(Category);

CategorySchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'category_id',
});

export { CategorySchema };
