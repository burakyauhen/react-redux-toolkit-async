import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTodo = createAsyncThunk(
    'todos/fetchTodo',
    async function(_, {rejectWithValue}) {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
            if (!response.ok) {
                throw new Error('Server error. No fetched todos.');
            } 
            const data = await response.json();
            return data;
        } catch(error) {
            return rejectWithValue(error.message);
        }    
    }
);

export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async function(id, {rejectWithValue, dispatch}) {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: "DELETE",
            });
            
            if (!response.ok) {
                throw new Error('Server error. Todo hasn\'t been deleted.');
            } 

            dispatch(removeTodo({id}));
        } catch(error) {
            return rejectWithValue(error.message);
        }
    }
);

export const toggleStatus = createAsyncThunk(
    'todos/toggleStatus',
    async function(id, {rejectWithValue, getState, dispatch}) {
        const todo = getState().todos.value.find(todo => todo.id === id);
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'aplication/json',
                },
                body: JSON.stringify({
                    completed: !todo.completed,
                })
            })

            if (!response.ok) {
                throw new Error('Server error. Todo hasn\'t been toggled.');
            }

            dispatch(toggleTodo({id}));

        } catch(error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addNewTodo = createAsyncThunk(
    'todos, addNewTodo',
    async function(title, {rejectWithValue, dispatch}) {
        const todo = {
            userId: 1,
            title: title,
            completed: false,
        }

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(todo),
            });

            if (!response.ok) {
                throw new Error('Server error. Todo hasn\'t been added');
            }

            const data = await response.json();

            dispatch(addTodo(data));

        } catch(error) {
            return rejectWithValue(error.message);
        }
    }
); 

const setError = (state, action) => {
    state.status = 'rejected',
    state.error = action.payload;
}


const todosSlice = createSlice({
    name: "todos",
    initialState: {
        value: [],
        state: null, 
        error: null,
    },
    reducers: {
        addTodo: (state, action) => {
            console.log(action.payload)
            state.value.push(action.payload);
        },

        removeTodo: (state, action) => {
            state.value = state.value.filter((todo) => todo.id !== action.payload.id);
        },

        toggleTodo: (state, action) => {
            const toggledTodo = state.value.find((todo) => todo.id === action.payload.id);
            toggledTodo.completed = !toggledTodo.completed;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodo.pending, (state) => {
            state.status= 'loading';
            state.error = null;
        });
        builder.addCase(fetchTodo.fulfilled, (state, action) => {
            state.status = 'resolved';
            state.value = action.payload;
        });
        builder.addCase(fetchTodo.rejected, setError);
        builder.addCase(deleteTodo.rejected, setError);
        builder.addCase(toggleStatus.rejected, setError);
        builder.addCase(addNewTodo.rejected, setError);


    },


});

export const { addTodo, removeTodo, toggleTodo } = todosSlice.actions;

export default todosSlice.reducer;