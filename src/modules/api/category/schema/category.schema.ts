import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({timestamps:true,versionKey:false})
export class Category {

    @Prop({type:String,required:true,unique:true})
    name:string

    @Prop({type:String,default:0})
    image_url?:string
}

export const CategorySchema=SchemaFactory.createForClass(Category)