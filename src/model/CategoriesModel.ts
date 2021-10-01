import * as mongoose from "mongoose";

import { Categories } from "../interface/Categories";

const Schema = mongoose.Schema;

const Categories = new Schema(
    {
        category: {
            category_name: { type: String, required: true }
        }
    },
    { 
        timestamps: true,
    }
)

const CategoriesModel = mongoose.model<Categories>('categories', Categories)

export { CategoriesModel }