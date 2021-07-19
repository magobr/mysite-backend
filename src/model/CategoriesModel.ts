import * as mongoose from "mongoose";

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

const CategoriesModel = mongoose.model('categories', Categories)

export { CategoriesModel }