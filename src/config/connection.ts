import * as mongoose from 'mongoose';

class Database{
    constructor() {
        this.mongoCreateConn();
    }

    async mongoCreateConn(){
        await mongoose.connect('mongodb://localhost/mysite', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        }).then(() => {
            console.log("Connection is ready");
        }).catch((error)=>{
            console.log(`Error: ${error}`);
        })
    }
}

export = new Database();