//login la Promise void vi ham fetch ko return gia tri trong ham then cuoi
const login = (email: string, password: string) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  };

  return fetch(`${process.env.REACT_APP_API_URL}/auth`, requestOptions)
    .then(handleResponse)
    .then((response) => {
      sessionStorage.setItem("user", JSON.stringify(response));
      return response;
    });
};
//Ham handleRespone de xu ly loi va thanh cong
const handleResponse = (response: any) => {
  return response.text().then((text: string) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        logout();
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
};

const logout = () => {
  sessionStorage.removeItem("user");
};

export const userService = {
  login,
  logout,
};
