import express from 'express';
import { Route } from './core/interfaces';

export class App{//Muon import thi phai export
    public app: express.Application;//express khac Express
    public port: number | string;

    constructor(routes: Route[]){//Chinh la route duoc dinh nghia tu src/core/interfaces/routes.interfaces.ts
        this.app = express();
        this.port = process.env.PORT || 5000;//mac dinh la 5000

        this.initializeRoutes(routes);
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
}