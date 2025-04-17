import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAddTaskPayload, ITask, ITasksState } from "./types";
import { v4 as uuidv4 } from "uuid";
import { storage } from "@/storage/tasksStorage";

const initialState: ITasksState = {
    data: storage.get(),
};

export const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<IAddTaskPayload>) => {
            const newTask: ITask = {
                id: uuidv4(),
                completed: false,
                ...action.payload,
            };
            state.data.push(newTask);
            storage.save(state.data);
        },
        updateTask: (state, action: PayloadAction<ITask>) => {
            const index = state.data.findIndex(task => task.id === action.payload.id);
            if (index !== -1) {
                state.data[index] = action.payload;
            }
            storage.save(state.data);
        },
        deleteTask: (state, action: PayloadAction<string>) => {
            state.data = state.data.filter(task => task.id !== action.payload);
            storage.save(state.data);
        },
        toggleTaskCompletion: (state, action: PayloadAction<string>) => {
            const task = state.data.find(task => task.id === action.payload);
            if (task) {
                task.completed = !task.completed;
            }
            storage.save(state.data);
        },
    },
});

export const { addTask, updateTask, deleteTask, toggleTaskCompletion } = tasksSlice.actions;
export default tasksSlice.reducer;
