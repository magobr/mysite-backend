import * as express from "express";
import { CategoriesModel } from "../model/CategoriesModel";
import { Categories } from "../interface/Categories";

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

        let { category } = req.body;
        const categoryInterface = { category }

        CategoriesModel.create(categoryInterface, (err)=>{
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
}

export { CategoriesController }