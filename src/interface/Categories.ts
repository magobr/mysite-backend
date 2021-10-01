import { Document } from "mongoose";
export interface Categories extends Document{
    category:{
        category_name: String,
    }
}