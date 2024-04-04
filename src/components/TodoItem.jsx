import { deleteTodo, toggleStatus } from "../slices/todosSlice";
import { useDispatch } from "react-redux";

const TodoItem = ({ id, title, completed }) => {
  const dispatch = useDispatch();
    return (
        <li className='item'>
          <input 
            type="checkbox" 
            checked={completed} 
            onChange={() => dispatch(toggleStatus(id))}
          />
          <span>{title}</span>
          <span className="delete" onClick={() => dispatch(deleteTodo(id))}>&times;</span>
        </li>
    );
}

export { TodoItem }