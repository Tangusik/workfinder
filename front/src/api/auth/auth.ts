import api from "../axios";

interface LoginResponse {
  access_token: string;
  refreshToken?: string;
  expiresIn?: number;
}

export const login = async (credentials: {
  username: string;
  password: string;
}): Promise<LoginResponse> => {
  console.log(credentials);

  try {
    const response = await api.post<LoginResponse>(
      "user/auth/login",
      credentials,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    localStorage.setItem("access_token", response.data.access_token);
    if (response.data.refreshToken) {
      localStorage.setItem("refreshToken", response.data.refreshToken);
    }

    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${response.data.access_token}`;

    return response.data;
  } catch (error) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    throw error;
  }
};
