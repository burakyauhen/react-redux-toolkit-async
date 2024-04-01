import './App.css';
import { useState } from "react";
import { InputField } from './components/InputField';
import { TodoList } from './components/TodoList';


function App() {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    setTodos([
      ...todos,
      {
        id: new Date().toISOString(),
        text: text,
        completed: false,
      }
    ]);
    setText('');
  }

  const toggleTodo = (todoId) => {
    setTodos(todos.map((todo) => todo.id === todoId ? {...todo, completed: !todo.completed} : todo));
  }

  const removeTodo = (todoId) => {
    setTodos(todos.filter((todo) => todo.id !== todoId));
  }

  return (
   <div className="app">
    <InputField 
      text={text}
      setText={setText}
      addTodo={addTodo}
    />
    <TodoList 
      todos={todos}
      addTodo={addTodo}
      toggleTodo={toggleTodo}
      removeTodo={removeTodo}
    />
  </div>
  )
}

export default App
