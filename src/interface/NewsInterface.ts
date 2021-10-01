import { Document } from "mongoose";
import { UserType } from "../enums/UserEnum";
import { Categories } from "./Categories";

export interface News extends Document{
    author: {
        frist_name: String,
        last_name: String,
        email: String,
        user_type: UserType
    },
    news: {
        headline: String,
        caption: String,
        bodyNews: String,
        category: Categories,
        image: Buffer
    }
}