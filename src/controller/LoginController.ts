import { Request, Response } from 'express';
import { UserModel } from "../model/UserModel";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { authConfig } from "../config/auth";
import { User } from "../interface/UserInterface"
import { UserStatus } from "../enums/UserEnum"

class LoginController {

    async login(req: Request, res: Response){
        const { email, password } = req.body;

        const userExist: User = await UserModel.findOne({ email, })

        if (!userExist){
            return res.status(400).json({
                error: true,
                message: "User does not exist"
            })
        }

        if (userExist.user_status === UserStatus.Disabled) {
            return res.status(200).json({
                error: true,
                message: "User is disabled"
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
                last_name: userExist.last_name,
                email: userExist.email
            },
            token: jwt.sign(
                {
                    _id: userExist._id,
                    user_type: userExist.user_type,
                    frist_name: userExist.frist_name,
                    last_name: userExist.last_name,
                    email: userExist.email,
                }, 
                authConfig.secret, 
                {expiresIn: authConfig.expireIn} 
            )
        })
    }

    async logout(req: Request, res: Response){
        let auth = req.headers.authorization
        if (auth){
            auth = null,
            res.status(200).send(
                auth
            );
        } 
    }

}

export { LoginController }