// import 'reflect-metadata';
import * as express from 'express';
import * as cors from "cors";
require("./config/connection");
// import createConnection from './database';
import { route } from './routes'; 

// createConnection();
const app = express();
class App {
    constructor() {
        this.middlewares();
        this.routes();
    }
    
    middlewares(){
        app.use(express.json());
        app.use(express.json());
        
        app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            
            app.use(cors());
            next();
        })
    }

    routes(){
        app.use(route);
    }

    runningServer(port: number, callback: Function){
        app.listen(port, callback());
    }

}

// app.use(router);

export { App }