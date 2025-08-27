import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({ timestamps: true, versionKey: false })
export class Order {
    @Prop({ type: Number, required: true })
    total_price: number;

    @Prop({ type: Types.ObjectId, ref: "Product", required: true })
    product_id: string;

    @Prop({ type: Types.ObjectId, ref: "Customer", required: true })
    customer_id: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
