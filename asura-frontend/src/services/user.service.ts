import { api } from "../helpers";

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

//Bo handleResponse di vi xai middleware
const logout = () => {
  sessionStorage.removeItem("user");
};

export const userService = {
  login,
  logout,
  getCurrentLoginUser,
};
