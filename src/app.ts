import dotenv from 'dotenv';
dotenv.config();//De dung duoc dotenv thi phai import o dau cua doan ma
import express from 'express';
import { Route } from '@core/interfaces';
import mongoose from 'mongoose';
import helmet from 'helmet';
import hpp from 'hpp';
import cors from 'cors';
import e from 'express';
import {logger} from '@core/utils';
import {errorMiddleware} from '@core/middleware';
import morgan from 'morgan';

export class App{//Muon import thi phai export
    public app: express.Application;//express khac Express
    public port: number | string;
    public production: boolean;

    constructor(routes: Route[]){//Chinh la route duoc dinh nghia tu src/core/interfaces/routes.interfaces.ts
        this.app = express();
        this.port = process.env.PORT || 5000;//mac dinh la 5000
        this.production = process.env.NODE_ENV == 'production'?true:false
        this.connectToDatabase();
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        this.initializeErrorMiddleware();
    }
    private initializeErrorMiddleware(){
        this.app.use(errorMiddleware);
    }

    private initializeRoutes(routes: Route[]){
        routes.forEach((route)=> {
            this.app.use('/', route.router);//Chinh la app.use('/', route.router); trong src/modules/index/index.route.ts
    })
    };

    public listen(){//de thang khac chay ham listen nay nua
        this.app.listen(this.port, ()=>{
            logger.info(`Server is running on port ${this.port}`);
        })
    };

    private connectToDatabase(){
        try {
            //Git bao la khong duoc de thong tin dang nhap o day, nen phai de o file env
            const connectString = process.env.MONGODB_URI;
            //Do connectString truyen vao .connect nen phai kiem tra undefined
            if (!connectString) {
                logger.error('MONGODB_URI is not defined in .env file');
                return;
            }
            mongoose.connect(connectString);
            logger.info('Connected to database successfully!');
        } catch (error) {
            logger.error('Error connecting to database:');
        }
    }

    private initializeMiddlewares(){
        if(this.production){
            this.app.use(hpp());
            this.app.use(helmet());
            this.app.use(morgan("combined"));
            this.app.use(
                cors({origin: "your.domain.com", credentials: true})
            );
        }
        else{
            this.app.use(morgan("dev"));
            this.app.use(cors({origin: true, credentials: true}));
        }
        this.app.use(express.json());//Cai them may cai nay de nhan req body
        this.app.use(express.urlencoded({extended: true}));
    }
}

