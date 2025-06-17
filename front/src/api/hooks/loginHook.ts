import { useState, useCallback } from "react";
import api from "../axios";
import type { AxiosRequestConfig } from "axios";

const useAuthFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const authFetch = useCallback(async (config: AxiosRequestConfig) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");

      const response = await api({
        ...config,
        headers: {
          ...config.headers,
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { authFetch, loading, error };
};

export default useAuthFetch;
