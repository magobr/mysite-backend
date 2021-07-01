import { Request, Response } from 'express';
import { UserModel } from "../model/UserModel";
import * as yup from "yup";
import * as bcrypt from "bcryptjs";
 
class UserController {
    async store(Request: Request, Response: Response) {

        let schema = yup.object().shape({
            last_name: yup.string().required(),
            frist_name: yup.string().required(),
            email: yup.string().email().required(),
            password: yup.string().required()
        });
    
        if(!(await schema.isValid(Request.body))){
          return Response.status(400).json({
            error: true,
            message: "Dados inválidos"
          })
        }
    
        let userExist = await UserModel.findOne({ email: Request.body.email });
        if(userExist) {
          return Response.status(400).json({
            error: true,
            message: "Este usuário já existe!"
          })
        }
        
        const { frist_name, last_name, email, password } = Request.body;      
        const data = { frist_name, last_name, email, password };
    
        data.password = await bcrypt.hash(data.password, 8);
    
        UserModel.create(data, (err) => {
          if(err) return Response.status(400).json({
              error: true,
              message: "Erro ao tentar inserir usuário no MongoDB"
            })
    
            return Response.status(200).json({
              error: false,
              message: "Usuário Cadastrado com sucesso"
            })
        })
      }
}

export { UserController }