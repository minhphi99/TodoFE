import React, { useEffect, useState } from "react";
import { getTodoById } from "../../api/todoApi";
import { useParams } from "react-router-dom";
import "./Todo.css";

interface Todo {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
}

const TodoDetail = () => {
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        if (id) {
          const todo = await getTodoById(id);
          setTodo(todo);
        }
      } catch (error) {
        console.error("Error fetching todo:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!todo) {
    return <div>Todo not found</div>;
  }

  return (
    <div className="todo-container">
      <h1>{todo.title}</h1>
      <p>{todo.description}</p>
      <p>Completed: {todo.completed ? "Yes" : "No"}</p>
    </div>
  );
};

export default TodoDetail;
