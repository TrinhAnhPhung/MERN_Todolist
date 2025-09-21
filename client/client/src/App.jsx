import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// URL của backend API. Trong lúc phát triển là localhost
// Khi deploy, chúng ta sẽ thay đổi nó.
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/todos";

function App() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");

    useEffect(() => {
        getTodos();
    }, []);

    const getTodos = () => {
        axios.get(API_BASE)
            .then(res => setTodos(res.data))
            .catch(err => console.error("Error fetching todos: ", err));
    };

    const completeTodo = async (id) => {
        const { data } = await axios.put(`${API_BASE}/complete/${id}`);
        setTodos(todos => todos.map(todo => {
            if (todo._id === data._id) {
                todo.completed = data.completed;
            }
            return todo;
        }));
    };

    const deleteTodo = async (id) => {
        await axios.delete(`${API_BASE}/delete/${id}`);
        setTodos(todos => todos.filter(todo => todo._id !== id));
    };

    const addTodo = async (e) => {
        e.preventDefault();
        if (!newTodo) return;

        const { data } = await axios.post(`${API_BASE}/new`, { task: newTodo });
        setTodos([...todos, data]);
        setNewTodo("");
    };

    return (
        <div className="App">
            <h1>Todo List</h1>
            <h4>Your tasks</h4>
            <form onSubmit={addTodo}>
                <input
                    type="text"
                    onChange={e => setNewTodo(e.target.value)}
                    value={newTodo}
                    placeholder="Add a new task..."
                />
                <button type="submit">Add</button>
            </form>
            <div className="todos">
                {todos.map(todo => (
                    <div className={"todo" + (todo.completed ? " is-complete" : "")} key={todo._id}>
                        <div className="task" onClick={() => completeTodo(todo._id)}>
                            {todo.task}
                        </div>
                        <button className="delete-btn" onClick={() => deleteTodo(todo._id)}>x</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;