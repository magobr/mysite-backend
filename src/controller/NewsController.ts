import * as express from "express";
import { NewsModel } from "../model/NewsModel";
import { CategoriesModel } from "../model/CategoriesModel";
import { News } from "../interface/NewsInterface";

interface Request extends express.Request {
    user?: any
}
  
class NewsController{
    async store(req: Request, res: express.Response){

        if(!req.body){
            return res.status(400).json({
                error: true,
                message: "Fill in all fields"
            });
        }

        let { news } = req.body;

        if (news.category.category_name != ""){
            let categoryExists = await CategoriesModel.findOne({ category: {category_name: news.category.category_name }});
            if (!categoryExists) {
                return res.status(400).json({
                    error: true,
                    message: "There is no such category"
                });
            }
        }
        
        let author = req.user
        
        const newsInterface: News = { author, news }

        NewsModel.create(newsInterface, (err)=>{
            if(err) return res.status(400).json({
                error: true,
                message: "Error registering news"
            })
    
            return res.status(200).json({
                error: false,
                message: "News registering successfully"
            })
        })

    }
}

export { NewsController }