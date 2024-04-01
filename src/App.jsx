import './App.css';
import { useState } from "react";
import { InputField } from './components/InputField';
import { TodoList } from './components/TodoList';


function App() {
  const [text, setText] = useState('');

  return (
   <div className="app">
    <InputField 
      text={text}
      setText={setText}
    />
    <TodoList />
  </div>
  )
}

export default App
