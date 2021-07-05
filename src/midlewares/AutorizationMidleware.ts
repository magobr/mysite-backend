import * as express from "express";
import { UserType } from "../enums/UserEnum";

interface Request extends express.Request {
    user?: any
}

class Auto{
    
    LevelAdmin(req: Request, res: express.Response, next: express.NextFunction){
        if (req.user.user_type === UserType.Admin)
            next()
    }

    LevelUser(req: Request, res: express.Response, next: express.NextFunction){
        if (req.user.user_type === UserType.User)
            next()
    }

    LevelReader(req: Request, res: express.Response, next: express.NextFunction){
        if(req.user.user_type === UserType.Reader)
            next()
    }
}

export const Autorization = new Auto()