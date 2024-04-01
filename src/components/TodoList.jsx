import { TodoItem } from "./TodoItem";


const TodoList = ({ todos, addTodo, toggleTodo, removeTodo }) => {
    return(
        <ul>
            {todos.map((todo) => (
                <TodoItem 
                    key={todo.id} 
                    {...todo}
                    toggleTodo={toggleTodo}
                    removeTodo={removeTodo}
                />
            ))}
        </ul>
    );
}

export { TodoList }