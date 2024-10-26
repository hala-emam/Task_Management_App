

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    tasks: JSON.parse(localStorage.getItem('tasks')) || [],
    // status: 'all'
};


const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload);
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
      
        editTask: (state, action) => {
            const { id, title, description, priority, status, image } = action.payload;
            state.tasks = state.tasks.map((task) =>
                task.id === action.payload.id
                    ? action.payload
                    : task
            );
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
        deleteTask: (state, action) => {
            state.tasks= state.tasks.filter((task) => task.id !== action.payload);
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
    },

});
export const { addTask, editTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
