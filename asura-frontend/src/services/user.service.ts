import { api, IPagination } from "../helpers";
import { IAddUserRequest, IUser } from "../store/users/types";

//login la Promise void vi ham fetch ko return gia tri trong ham then cuoi
const login = async (email: string, password: string) => {
  const body = { email, password };
  return await api.post<any>("/auth", body).then((response) => {
    sessionStorage.setItem("token", response.data.token);
    return response.data;
  });
};
const getCurrentLoginUser = async (): Promise<any> => {
  return await api.get<any>("/auth").then((response) => {
    console.log(response);
    return response.data;
  });
};
const getUsersPaging = async (
  currentPage: number,
  keyword: string
): Promise<IPagination<IUser>> => {
  const res = await api
    .get<IPagination<IUser>>(`/users/paging/${currentPage}?keyword=${keyword}`)
    .then((response) => {
      response.data.keyword = keyword;
      console.log(response);
      return response.data;
    });
  return res;
};
//Bo handleResponse di vi xai middleware
const logout = () => {
  sessionStorage.removeItem("user");
};
const addUser = async (user: IAddUserRequest): Promise<any> => {
  const res = await api.post("/users", user).then((response) => {
    return response.data;
  });
  return res;
};
export const userService = {
  login,
  logout,
  getCurrentLoginUser,
  getUsersPaging,
  addUser,
};
