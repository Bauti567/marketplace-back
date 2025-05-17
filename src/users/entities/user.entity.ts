import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {

    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop()
    phone: string;

    @Prop({ required: true, enum: ['seller', 'buyer', 'admin'], default: 'buyer' })
    role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
