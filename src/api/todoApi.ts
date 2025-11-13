import axiosClient from "./axiosClient";

const BASE_URL = "http://localhost:3000";

export const getAllTodos = async (payload: DeviceInfoPayload) => {
  try {
    const res = await axiosClient.get(`${BASE_URL}`, payload);
    return res.data.result;
  } catch (error) {
    return error;
  }
};

export const createTodo = async () => {
  try {
    const res = await axiosClient.post(`${BASE_URL}`);
    return res.data.result;
  } catch (error) {
    return error;
  }
};

export const getTodoById = async (id: string) => {
  try {
    const res = await axiosClient.get(`${BASE_URL}/${id}`);
    return res.data.result;
  } catch (error) {
    return error;
  }
};

export const updateTodoById = async (id: string) => {
  try {
    const res = await axiosClient.put(`${BASE_URL}/${id}`);
    return res.data.result;
  } catch (error) {
    return error;
  }
};

export const deleteTodo = async (id: string) => {
  try {
    const res = await axiosClient.delete(`${BASE_URL}/${id}`);
    return res.data.result;
  } catch (error) {
    return error;
  }
};
