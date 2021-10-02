import * as express from "express";
import { CategoriesModel } from "../model/CategoriesModel";

interface Request extends express.Request {
    user?: any
}
  
class CategoriesController{
    async store(req: Request, res: express.Response){

        if(!req.body){
            return res.status(400).json({
                error: true,
                message: "Fill in all fields"
            });
        }

        CategoriesModel.create(req.body, (err: any)=>{
            if(err) return res.status(400).json({
                error: true,
                message: "Error registering Category"
            })
    
            return res.status(200).json({
                error: false,
                message: "Category registering successfully"
            })
        })
    }

    async find(req: Request, res: express.Response){
        
        let category;
        if(!req.params.id){
            category = await CategoriesModel.find({ });
        } else {
            category = await CategoriesModel.findById(req.params.id);
        }

        if(!category){
            return res.status(200).json({
            error: true,
            message: "No Records!"
            });
        }

        return res.status(200).json(category);
    }
}

export { CategoriesController }