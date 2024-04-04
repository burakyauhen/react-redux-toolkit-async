const InputField = ({ text, setText, handleClick }) => {

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