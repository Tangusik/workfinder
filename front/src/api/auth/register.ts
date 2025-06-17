import api from "../axios";

interface RegResponse {
  id: number;
  email: string;
  is_active?: string;
  is_verified?: string;
  is_superuser?: string;
}

const request_verify = async (email: string) => {
  try {
    console.log({ "email": email })
    const response = await api.post(
      "user/auth/request-verify-token",
      { "email": email },
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

export const register = async (credentials: {
  email: string;
  password: string;
}): Promise<RegResponse> => {
  try {
    const response = await api.post<RegResponse>(
      "user/auth/register",
      credentials,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    await request_verify(credentials.email);

    return response.data;
  } catch (error) {
    throw error;
  }
};
