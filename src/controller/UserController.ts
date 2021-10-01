import * as express from 'express';
import { UserModel } from "../model/UserModel";
import * as yup from "yup";
import * as bcrypt from "bcryptjs";
import { User } from "../interface/UserInterface";
import { UserType } from "../enums/UserEnum";

interface Request extends express.Request {
  user?: any
}
 
class UserController {
  async store(req: Request, res: express.Response, next: express.NextFunction) {

    let schema = yup.object().shape({
        last_name: yup.string().required(),
        frist_name: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().required()
    });

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({
        error: true,
        message: "Dados inválidos"
      })
    }

    let userExist = await UserModel.findOne({ email: req.body.email });
    if(userExist) {
      return res.status(226).json({
        error: true,
        message: "This user already exists!"
      })
    }
    
    const { frist_name, last_name, email, password, user_type, user_status } = req.body;

    const userInterface = { frist_name, last_name, email, password, user_type, user_status };

    userInterface.password = await bcrypt.hash(userInterface.password.toString(), 8);

    UserModel.create(userInterface, (err) => {
      if(err) return res.status(400).json({
        error: true,
        message: "Erro ao tentar inserir usuário no MongoDB"
      })

      return res.status(200).json({
        error: false,
        message: "Usuário Cadastrado com sucesso"
      })
    })
  }

  async find(req: Request, res: express.Response, next: express.NextFunction){

    let users;
    if (!req.params.id) {
      users = await UserModel.find({});  
    } else {
      users = await UserModel.findById(req.params.id);
    }

    if(!users){
      return res.status(200).json({
        error: true,
        message: "No Records!"
      });
    }

    return res.status(200).json(users);
  }

  async del(req: Request, res: express.Response, next: express.NextFunction){
    const userId = req.params.id;
    const loggedUser =  req.user;

    if (loggedUser._id === userId) {
      return res.status(200).json({
        error: true,
        message: "can't be excluded"
      });
    }
    
    let result = await UserModel.findOneAndRemove({_id: userId});

    if(!result){
      return res.status(404).json({
        error: true,
        message: "The user does not exist"
      });
    }

    return res.status(200).json({
      error: false,
      message: "User removed successfully!",
      result: result
    });
  }

  async update(req: Request, res: express.Response, next: express.NextFunction){
    const _id = req.params.id;
    const { frist_name, last_name, email, password, user_type, user_status } = req.body;

    const userInterface = { _id, frist_name, last_name, email, password, user_type, user_status };
    userInterface.password = await bcrypt.hash(userInterface.password.toString(), 8);

    let result = await UserModel.findOneAndReplace({_id: _id}, userInterface);

    if(!result){
      return res.status(404).json({
        error: true,
        message: "The user does not exist"
      });
    }

    return res.status(200).json({
      error: false,
      message: "User updated successfully!",
      result: result
    });
  }

  async getUserType(req: Request, res: express.Response, next: express.NextFunction){
    return res.status(200).json({
      error: false,
      UserType
    })
  }

}

export { UserController }