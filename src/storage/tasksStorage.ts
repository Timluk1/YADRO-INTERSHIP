import { ITask } from "@/core/Tasks/types";

const STORAGE_KEY = "tasks";

export class TasksStorage {
    save(tasks: ITask[]) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }

    get(): ITask[] {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];

        const tasks: ITask[] = JSON.parse(raw);
        return tasks;
    }

    clear() {
        localStorage.removeItem(STORAGE_KEY);
    }
}

export const storage = new TasksStorage();
