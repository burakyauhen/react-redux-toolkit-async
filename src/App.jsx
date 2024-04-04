import './App.css';
import { useEffect, useState } from "react";
import { InputField } from './components/InputField';
import { TodoList } from './components/TodoList';
import { useDispatch, useSelector } from 'react-redux';
import { addNewTodo } from './slices/todosSlice';
import { fetchTodo } from './slices/todosSlice';



function App() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const { status, error } = useSelector(state => state.todos);

  const handleAddTodo = () => {
    dispatch(addNewTodo(text));
    setText('');
}

useEffect(() => {
  dispatch(fetchTodo())
}, [dispatch]);

  return (
   <div className="app">
    <InputField 
      text={text}
      setText={setText}
      handleClick={handleAddTodo}
    />

    {status === "loading" && <h1>Loading...</h1>}
    {error && <h1>{error}</h1>}
    <TodoList />
  </div>
  )
}

export default App
