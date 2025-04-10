import { Router } from "express";
import { Route } from "../../core/interfaces";
import IndexController from "./index.controller";

export default class IndexRoute implements Route{
public path = '/';
public router = Router();
//Trong Nodejs ta co the thoai mai new vi ta co the unit test duoc, huong thu tuc
public indexController = new IndexController();
constructor(){
    this.initializeRoutes();
}
private initializeRoutes(){
    this.router.get(this.path, this.indexController.index);//Chinh la path = '/'; voi cu phap giong app.get('/', (req, res) ...)
}
}
