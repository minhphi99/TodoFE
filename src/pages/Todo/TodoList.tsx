import React, { useEffect, useState } from "react";
import { getAllTodos, deleteTodo, createTodo } from "../../api/todoApi";
import { Link } from "react-router-dom";
import "./Todo.css";

interface Todo {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });

  const fetchTodos = async () => {
    try {
      const todos = await getAllTodos();
      setTodos(todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const createdTodo = await createTodo(newTodo);
      if (createdTodo && createdTodo._id) {
        setTodos((prev) => [...prev, createdTodo]);
      }
      setNewTodo({ title: "", description: "" });
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo({ ...newTodo, [e.target.name]: e.target.value });
  };

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <form onSubmit={handleCreate} className="todo-form">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newTodo.title}
          onChange={handleChange}
          className="todo-input"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newTodo.description}
          onChange={handleChange}
          className="todo-input"
        />
        <button type="submit" className="todo-button">
          Add Todo
        </button>
      </form>
      <ul className="todo-list">
        {todos.filter(Boolean).map((todo) =>
          todo ? (
            <li key={todo._id} className="todo-item">
              <Link to={`/todo/${todo._id}`} className="todo-title">
                {todo.title}
              </Link>
              <div className="todo-buttons">
                <button
                  onClick={() => handleDelete(todo._id)}
                  className="todo-button"
                >
                  Delete
                </button>
                <Link to={`/todo/edit/${todo._id}`} className="todo-button">
                  Edit
                </Link>
              </div>
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
};

export default TodoList;
