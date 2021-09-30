import * as express from 'express';
import { UserModel } from "../model/UserModel";
import * as yup from "yup";
import * as bcrypt from "bcryptjs";
import { User } from "../interface/UserInterface";

interface Request extends express.Request {
  user?: any
}
 
class UserController {
  async store(Request: Request, Response: express.Response, next: express.NextFunction) {

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
      return Response.status(226).json({
        error: true,
        message: "This user already exists!"
      })
    }
    
    const { frist_name, last_name, email, password, user_type } = Request.body;      

    const userInterface: User = { frist_name, last_name, email, password, user_type };

    userInterface.password = await bcrypt.hash(userInterface.password.toString(), 8);

    UserModel.create(userInterface, (err) => {
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

  async find(Request: Request, Response: express.Response, next: express.NextFunction){

    let users = "";
    if (!Request.params.id) {
      users = await UserModel.find({});  
    } else {
      users = await UserModel.findById(Request.params.id);
    }

    if(!users){
      return Response.status(200).json({
        error: true,
        message: "No Records!"
      });
    }

    return Response.status(200).json(users);
  }

  async del(Request: Request, Response: express.Response, next: express.NextFunction){
    const userId = Request.params.id;
    const loggedUser =  Request.user;

    if (loggedUser._id === userId) {
      return Response.status(200).json({
        error: true,
        message: "can't be excluded"
      });
    }
    
    let result = await UserModel.findOneAndRemove({_id: userId});

    if(!result){
      return Response.status(404).json({
        error: true,
        message: "The user does not exist"
      });
    }

    return Response.status(200).json({
      error: false,
      message: "User removed successfully!",
      result: result
    });
  }

  async update(Request: Request, Response: express.Response, next: express.NextFunction){
    const userId = Request.params.id;
    const { frist_name, last_name, email, password, user_type } = Request.body;

    const userInterface: User = { frist_name, last_name, email, password, user_type };
    userInterface.password = await bcrypt.hash(userInterface.password.toString(), 8);

    let result = await UserModel.findOneAndReplace({_id: userId}, userInterface);

    if(!result){
      return Response.status(404).json({
        error: true,
        message: "The user does not exist"
      });
    }

    return Response.status(200).json({
      error: false,
      message: "User updated successfully!",
      result: result
    });
  }

}

export { UserController }