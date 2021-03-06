import * as mongoose from "mongoose";
import { News } from "../interface/NewsInterface";

const Schema = mongoose.Schema;

const News = new Schema(
    {
        author: {
            _id: { type: String, required: true },
            frist_name: { type: String, required: true },
            last_name: { type: String, required: true },
            email : { type: String, required: true },
        },
        news: {
            headline: { type: String, required: true },
            caption: { type: String, required: true },
            bodyNews: { type: String, required: true },
            category:{
                category_name: { type: String }
            },
            image: { type: Buffer }
        }
    },
    { 
        timestamps: true,
    }
)

const NewsModel = mongoose.model<News>('news', News)

export { NewsModel }