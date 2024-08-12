import apiClient from "./apiClient";
import { AxiosResponse } from "axios";

export interface User {
  id: number;
  name: string;
  job: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  avatar?: string;
}

export interface IGetAllUserResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
  support: {
    url: string;
    text: string;
  };
}

const getUsers = (): Promise<AxiosResponse<User[]>> => {
  return apiClient.get<User[]>("/api/users");
};

const getUser = (id: number): Promise<AxiosResponse<IGetAllUserResponse>> => {
  return apiClient.get(`/api/users/${id}`);
};

const createUser = (user: User): Promise<AxiosResponse<User>> => {
  return apiClient.post<User>("/api/users", user);
};

const updateUser = (id: number, user: User): Promise<AxiosResponse<User>> => {
  return apiClient.put<User>(`/api/users/${id}`, user);
};

const deleteUser = (id: number): Promise<AxiosResponse<void>> => {
  return apiClient.delete<void>(`/api/users/${id}`);
};

export default {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
