import { configureStore } from "@reduxjs/toolkit"
import TasksReducer from "./Tasks/TasksSlice"
import FiltersReducer from "./Filters/FiltersSlice"

export const store = configureStore({
    reducer: {
        tasks: TasksReducer,
        filters: FiltersReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch