import api from "../axios";

export const verify = async (token: string | undefined) => {
  try {
    const response = await api.post(
      "user/auth/verify",
      { "token": token },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
