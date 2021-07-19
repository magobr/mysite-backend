import * as mongoose from "mongoose";

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
            image: { type: Buffer }
        }
    },
    { 
        timestamps: true,
    }
)

const NewsModel = mongoose.model('news', News)

export { NewsModel }