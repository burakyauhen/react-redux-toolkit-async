
const TodoItem = ({ id, text, completed, toggleTodo, removeTodo }) => {
    return (
        <li className='item'>
          <input 
            type="checkbox" 
            checked={completed} 
            onChange={() => toggleTodo(id)}
          />
          <span>{text}</span>
          <span className="delete" onClick={() => removeTodo(id)}>&times;</span>
        </li>
    );
}

export { TodoItem }