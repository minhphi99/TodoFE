import React, { useEffect, useState } from "react";
import { getTodoById, updateTodoById } from "../../api/todoApi";
import { useParams, useNavigate } from "react-router-dom";
import "./Todo.css";

const EditTodo = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [todo, setTodo] = useState({ title: "", description: "" });

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        if (id) {
          const todo = await getTodoById(id);
          setTodo(todo);
        }
      } catch (error) {
        console.error("Error fetching todo:", error);
      }
    };
    fetchTodo();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await updateTodoById(id, todo);
        navigate(`/todo/${id}`);
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <div className="todo-container">
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={todo.title}
          onChange={handleChange}
          className="todo-input"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={todo.description}
          onChange={handleChange}
          className="todo-input"
        />
        <button type="submit" className="todo-button">
          Update Todo
        </button>
      </form>
    </div>
  );
};

export default EditTodo;
