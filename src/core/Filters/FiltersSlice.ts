import { filtersStorage } from "@/storage/fitersStorage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type StatusFilter = "all" | "completed" | "notCompleted";
export type DateFilter = "all" | "today" | "week" | "month" | "overdue";
export type PriorityFilter = "all" | "high" | "medium" | "low";

export interface IFiltersState {
    status: StatusFilter;
    date: DateFilter;
    priority: PriorityFilter;
}

const initialState: IFiltersState = filtersStorage.load();

const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setStatusFilter(state, action: PayloadAction<StatusFilter>) {
            state.status = action.payload;
            filtersStorage.save(state);
        },
        setDateFilter(state, action: PayloadAction<DateFilter>) {
            state.date = action.payload;
            filtersStorage.save(state);
        },
        setPriorityFilter(state, action: PayloadAction<PriorityFilter>) {
            state.priority = action.payload;
            filtersStorage.save(state);
        },
    },
});

export const { setStatusFilter, setDateFilter, setPriorityFilter } = filtersSlice.actions;
export default filtersSlice.reducer;
