import { Request, Response } from 'express';
import { UserModel } from "../model/UserModel";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { authConfig } from "../config/auth";

class LoginController {

    async login(req: Request, res: Response){
        const { email, password } = req.body;

        const userExist = await UserModel.findOne({ email, })

        if (!userExist){
            return res.status(400).json({
                error: true,
                message: "User does not exist"
            })
        }

        const passValid = await bcrypt.compare(password, userExist.password)
        
        if(!passValid){
            return res.status(400).json({
                error: true,
                message: "The password is invalid"
            })
        }

        return res.status(200).json({
            user: {
                _id: userExist._id,
                name: userExist.frist_name,
                email: userExist.email
            },
            token: jwt.sign(
                {id: userExist._id}, 
                authConfig.secret, 
                {expiresIn: authConfig.expireIn} 
            )
        })
    }

}

export { LoginController }