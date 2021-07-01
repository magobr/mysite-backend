import { App } from "./app";

const app = new App;

app.runningServer(3000,()=>{
    console.log('Server rodando')
})