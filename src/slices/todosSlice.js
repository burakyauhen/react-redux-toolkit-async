import { createSlice } from "@reduxjs/toolkit";

const todosSlice = createSlice({
    name: "todos",
    initialState: {
        value: [],
    },
    reducers: {
        addTodo: (state, action) => {
            state.value.push({
                id: new Date().toISOString(),
                text: action.payload.text,
                completed: false,

            })
        },

        removeTodo: (state, action) => {
            state.value = state.value.filter((todo) => todo.id !== action.payload.id);
        },

        toggleTodo: (state, action) => {
            const toggledTodo = state.value.find((todo) => todo.id === action.payload.id);
            toggledTodo.completed = !toggledTodo.completed;
        }
    }
});

export const { addTodo, removeTodo, toggleTodo } = todosSlice.actions;

export default todosSlice.reducer;