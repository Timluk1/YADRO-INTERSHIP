interface ITask {
    id: string;
    title: string;
    dueDate: string;
    completed: boolean;
    priority: "Низкий" | "Средний" | "Высокий";
}

type IAddTaskPayload = Omit<Omit<ITask, "completed">, "id">;

interface ITasksState {
    data: ITask[];
}

export type { ITask, IAddTaskPayload, ITasksState };
