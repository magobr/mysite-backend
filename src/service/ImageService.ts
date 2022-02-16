import * as express from 'express';
import { ImageModel } from "../model/ImageModel";

class ImageService {
    async store (req: express.Request, res: express.Response, next: express.NextFunction) {
        const {key, originalname, size, location} = req.file;
        const image = {key, originalname, size, location}

        console.log(req.file)

        ImageModel.create(image, (err: any)=>{
            if(err) return res.status(400).json({
                error: true,
                message: "Erro ao salvar imagem"
            })

            return res.status(200).json({
                error: false,
                message: "Imagen Salva com sucesso"
            })
        })
    }
}

export { ImageService }