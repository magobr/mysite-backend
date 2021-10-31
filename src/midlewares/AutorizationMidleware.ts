import * as express from "express";
import { UserType } from "../enums/UserEnum";

interface Request extends express.Request {
    user?: any
}

class Auto{
    
    LevelAdmin(req: Request, res: express.Response, next: express.NextFunction){
        if (req.user.user_type !== UserType.Admin){
            return res.status(203).json({
                error: true,
                message: "Not authorized"
            });
        } 
        next()  
    }

    LevelWriter(req: Request, res: express.Response, next: express.NextFunction){
        if (req.user.user_type !== UserType.Admin && req.user.user_type !== UserType.Escritor){
            return res.status(203).json({
                error: true,
                message: "Not authorized"
            });
        }
        next()
    }

    LevelReader(req: Request, res: express.Response, next: express.NextFunction){
        if(req.user.user_type !== UserType.Admin && req.user.user_type !== UserType.Leitor){
            return res.status(203).json({
                error: true,
                message: "Not authorized"
            });
        }
        next()
    }
}

export const Autorization = new Auto()