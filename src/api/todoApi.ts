import axiosClient from "./axiosClient";

const BASE_URL = import.meta.env.VITE_TODO_BASE_URL;

export const getAllTodos = async () => {
  try {
    const res = await axiosClient.get(`${BASE_URL}`);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const createTodo = async (data: {
  title: string;
  description: string;
}) => {
  try {
    const res = await axiosClient.post(`${BASE_URL}`, data);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getTodoById = async (id: string) => {
  try {
    const res = await axiosClient.get(`${BASE_URL}/${id}`);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const updateTodoById = async (
  id: string,
  data: { title: string; description: string }
) => {
  try {
    const res = await axiosClient.put(`${BASE_URL}/${id}`, data);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const deleteTodo = async (id: string) => {
  try {
    const res = await axiosClient.delete(`${BASE_URL}/${id}`);
    return res.data;
  } catch (error) {
    return error;
  }
};
