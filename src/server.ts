//De ma chay duoc cai nay thi chung ta phai cho lenh config ngay dau tien, thi dat trong server.ts
import 'dotenv/config';
import { App } from './app';
import { IndexRoute } from './modules/index';
//Chung ta se lien ket cac module lai trong file chinh nay
const routes = [new IndexRoute()];
const app = new App(routes);
app.listen();//Chay ham listen de bat dau server