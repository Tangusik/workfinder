import api from "../axios";

export const logout = async () => {
  try {
    const response = await api.post("user/auth/logout", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    localStorage.removeItem("access_token");
    if (response.data.refreshToken) {
      localStorage.removeItem("refresh_token");
    }
  } catch (error) {
    throw error;
  }
};
