import { deleteTask, toggleTaskCompletion } from "@/core/Tasks/TasksSlice";
import { ITask } from "@/core/Tasks/types";
import { Card, CardContent } from "@/ui/shadcn/card";
import { Checkbox } from "@/ui/shadcn/checkbox";
import { Button } from "@/ui/shadcn/button";
import { useAppDispatch } from "@/utils/hooks/useAppDispatch";
import { format, isBefore } from "date-fns";
import { Trash2 } from "lucide-react";
import { useDialog } from "@/utils/hooks/useDialog";
import { DialogTask } from "@/ui/DialogTask";

const getPriorityColor = (priority: ITask["priority"]) => {
    switch (priority) {
        case "Высокий":
            return "text-red-600";
        case "Средний":
            return "text-orange-500";
        case "Низкий":
            return "text-green-600";
        default:
            return "";
    }
};

export const Task: React.FC<ITask> = (task) => {
    const { id, title, dueDate, completed, priority } = task;
    const dispatch = useAppDispatch();
    const overdue = !completed && isBefore(new Date(dueDate), new Date());
    const { isOpen, closeDialog, openDialog } = useDialog();

    // функции для работы с таской
    const handleToggle = () => dispatch(toggleTaskCompletion(id));
    const handleDelete = () => dispatch(deleteTask(id));
    const handleEdit = () => openDialog();
    
    // определяем статус таски
    const statusLabel = completed
        ? "Выполнено"
        : overdue
            ? "Просрочено"
            : "Не выполнено";

    
    // определяем цвет статуса таски
    const statusColor = completed
        ? "text-green-600"
        : overdue
            ? "text-red-600"
            : "text-yellow-600";

    return (
        <Card className="shadow-md rounded-2xl">
            <CardContent className="p-4 flex justify-between items-center">
                <div className="flex items-start gap-3">
                    {!overdue && (
                        <Checkbox onCheckedChange={handleToggle} checked={completed} />
                    )}

                    <div className="flex flex-col gap-1">
                        <p className={`text-base font-medium ${completed ? "line-through text-muted-foreground" : ""}`}>
                            {title}
                        </p>

                        <p className={`text-sm ${overdue ? "text-red-600 font-semibold" : "text-muted-foreground"}`}>
                            До: {format(new Date(dueDate), "dd.MM.yyyy")}
                            {overdue && " (Просрочено)"}
                        </p>

                        <p className="text-sm">
                            Приоритет:{" "}
                            <span className={`font-medium ${getPriorityColor(priority)}`}>
                                {priority}
                            </span>
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex flex-col gap-3 text-sm font-semibold">
                        <span className={statusColor}>{statusLabel}</span>
                        <Button onClick={handleEdit} variant="ghost">Изменить</Button>
                    </div>

                    <button onClick={handleDelete}>
                        <Trash2 />
                    </button>
                </div>
            </CardContent>
            {/* Диалог для редактирования задачи */}
            <DialogTask
                open={isOpen}
                openDialog={openDialog}
                closeDialog={closeDialog}
                title="Редактировать задачу"
                description="Заполните форму, чтобы отредактировать задачу"
                submitButtonText="Изменить задачу"
                task={task}
            />
        </Card>
    );
};
