import * as express from "express";
import { NewsModel } from "../model/NewsModel";
import { CategoriesModel } from "../model/CategoriesModel";

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
        
        let { _id, frist_name, last_name, email } = req.user

        let author = {
            _id,
            frist_name,
            last_name,
            email
        }
        
        NewsModel.create({ author, news }, (err)=>{
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

    async find(req: Request, res: express.Response, next: express.NextFunction){

        let news;
        if (!req.params.id) {
            news = await NewsModel.find({});  
        } else {
            news = await NewsModel.findById(req.params.id);
        }

        if(!news){
            return res.status(200).json({
            error: true,
            message: "No Records!"
            });
        }

        return res.status(200).json(news);
    }

    async del(req: Request, res: express.Response, next: express.NextFunction){

        let result = await NewsModel.findOneAndRemove({_id: req.params.id});
    
        if(!result){
          return res.status(404).json({
            error: true,
            message: "News does not exist!"
          });
        }
    
        return res.status(200).json({
          error: false,
          message: "News removed successfully!",
          result: result
        });
    }

    async update(req: Request, res: express.Response, next: express.NextFunction){
        const newsId = req.params.id;
        
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
        const authorOfNews = await NewsModel.findById(newsId);
        if (!authorOfNews) {
            return res.status(404).json({
                error: true,
                message: "The news does not exist"
            });
        }
        
        const author = authorOfNews.author;
        const newsInterface = { author, news }

        let result = await NewsModel.findOneAndReplace({_id: newsId}, newsInterface);
    
        return res.status(200).json({
          error: false,
          message: "News updated successfully!",
          result: result
        });
    }
}

export { NewsController }