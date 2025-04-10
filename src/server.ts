import { App } from './app';
import { IndexRoute } from './modules/index';
//Chung ta se lien ket cac module lai trong file chinh nay
const routes = [new IndexRoute()];
const app = new App(routes);
app.listen();//Chay ham listen de bat dau server