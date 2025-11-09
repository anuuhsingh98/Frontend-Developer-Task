import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

export default function Dashboard() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const userName = localStorage.getItem("name");
    const userEmail = localStorage.getItem("email");
    setName(userName);
    setEmail(userEmail);
    loadTodos();
    // eslint-disable-next-line
  }, []);

  const loadTodos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/todos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(res.data.todos);
    } catch (err) {
      console.error(err);
    }
  };

  const addTodo = async () => {
    if (!task.trim()) return;
    try {
      await axios.post(
        "http://localhost:5000/todos",
        { title: task },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTask("");
      loadTodos();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      loadTodos();
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="dashboard-container">
      <div className="header">
        <h1>Employee Dashboard</h1>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      <p>
        <b>Name:</b> {name}
      </p>
      <p>
        <b>Email:</b> {email}
      </p>
      <p>
        <b>Date:</b> {new Date().toLocaleDateString()}
      </p>

      <hr />

      <div className="todo-section">
        <h2>ToDo List</h2>
        <input
          type="text"
          placeholder="Today task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>

        <ul>
          {todos.map((t) => (
            <li key={t._id}>
              {t.title}
              <button
                className="delete-btn"
                onClick={() => deleteTodo(t._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

