import express from 'express';
import { Route } from './core/interfaces';
import mongoose from 'mongoose';

export class App{//Muon import thi phai export
    public app: express.Application;//express khac Express
    public port: number | string;

    constructor(routes: Route[]){//Chinh la route duoc dinh nghia tu src/core/interfaces/routes.interfaces.ts
        this.app = express();
        this.port = process.env.PORT || 5000;//mac dinh la 5000

        this.initializeRoutes(routes);
        this.connectToDatabase();
    }

    private initializeRoutes(routes: Route[]){
        routes.forEach((route)=> {
            this.app.use('/', route.router);//Chinh la app.use('/', route.router); trong src/modules/index/index.route.ts
    })
    };

    public listen(){//de thang khac chay ham listen nay nua
        this.app.listen(this.port, ()=>{
            console.log(`Server is running on port ${this.port}`);
        })
    };

    private connectToDatabase(){
        try {
            //Git bao la khong duoc de thong tin dang nhap o day, nen phai de o file env
            const connectString = process.env.MONGODB_URI;
            //Do connectString truyen vao .connect nen phai kiem tra undefined
            if (!connectString) {
                console.log('MONGODB_URI is not defined in .env file');
                return;
            }
            mongoose.connect(connectString);
            console.log('Connected to database successfully!');
        } catch (error) {
            console.log('Error connecting to database:');
        }
    }
}