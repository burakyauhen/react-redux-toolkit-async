import { useDispatch } from "react-redux";
import { addTodo } from "../slices/todosSlice";

const InputField = ({ text, setText }) => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(addTodo({text}));
        setText('');
    }

    return (
        <label>
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button onClick={handleClick}>add</button>
        </label>
    );
};

export { InputField }