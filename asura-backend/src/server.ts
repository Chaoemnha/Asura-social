//De ma chay duoc cai nay thi chung ta phai cho lenh config ngay dau tien, thi dat trong server.ts
import "dotenv/config";
import { App } from "./app";
import { IndexRoute } from "@modules/index";
import { validateEnv } from "@core/utils/index";
import UsersRoute from "@modules/users/user.route";
import AuthRoute from "@modules/auth/auth.route";
import ProfileRoute from "@modules/profile/profile.route";
import PostsRoute from "@modules/posts/posts.route";
import GroupRoute from "@modules/groups/groups.route";
import ConversationRoute from "@modules/conversations/conversations.route";

validateEnv();
//Chung ta se lien ket cac module lai trong file chinh nay
const routes = [
  new IndexRoute(),
  new UsersRoute(),
  new AuthRoute(),
  new ProfileRoute(),
  new PostsRoute(),
  new GroupRoute(),
  new ConversationRoute(),
];
const app = new App(routes);
app.listen(); //Chay ham listen de bat dau server
