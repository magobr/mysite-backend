import * as express from 'express';
import * as jwt from "jsonwebtoken";
import { authConfig } from "../config/auth";

interface Request extends express.Request {
  user_id: any
}

async function AuthMidleware (req: Request, res: express.Response, next: express.NextFunction) {

  const auth = req.headers.authorization;

  if(!auth){
    return res.status(401).json({
      error: true,
      code: 130,
      message: "O token de autenticação não existe!"
    })
  }

  const [, token] = auth.split(' ');
  
  try {    
    const decoded = JSON.stringify(jwt.verify(token, authConfig.secret));
    const resultDecoded = JSON.parse(decoded)

    if(!decoded){
      return res.status(401).json({
        error: true,
        code: 130,
        message: "O token está expirado!"
      })
    } else {
        req.user_id = resultDecoded.id;
        next();
    }
    
  } catch {
    return res.status(401).json({
      error: true,
      code: 130,
      message: "O token está inválido!"
    })
  }
}




export {AuthMidleware}