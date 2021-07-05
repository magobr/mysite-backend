import { UserType } from "../enums/UserEnum";

export interface News {
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
        image: Buffer
    }
}