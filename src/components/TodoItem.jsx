import { removeTodo, toggleTodo } from "../slices/todosSlice";
import { useDispatch } from "react-redux";

const TodoItem = ({ id, text, completed }) => {
  const dispatch = useDispatch();
    return (
        <li className='item'>
          <input 
            type="checkbox" 
            checked={completed} 
            onChange={() => dispatch(toggleTodo({id}))}
          />
          <span>{text}</span>
          <span className="delete" onClick={() => dispatch(removeTodo({id}))}>&times;</span>
        </li>
    );
}

export { TodoItem }