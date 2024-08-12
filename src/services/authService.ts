import apiClient from "./apiClient";

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

const TOKEN_KEY = "auth_token";

const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>(
    "/api/login",
    credentials
  );
  localStorage.setItem(TOKEN_KEY, response.data.token);
  return response.data;
};

const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

const isAuthenticated = (): boolean => {
  return !!localStorage.getItem(TOKEN_KEY);
};

export default {
  login,
  logout,
  getToken,
  isAuthenticated,
};
