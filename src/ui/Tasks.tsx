import { useAppSelector } from "@/utils/hooks/useAppSelector";
import { Task } from "@/ui/Task";
import { isToday, isThisWeek, isThisMonth, isBefore } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { Inbox } from "lucide-react";
import { Input } from "@/ui/shadcn/input";
import { Search } from "lucide-react";
import debounce from "lodash.debounce";

export const Tasks = () => {
    const { data: tasks } = useAppSelector((state) => state.tasks);
    const { status, date, priority } = useAppSelector((state) => state.filters);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    // Обновляем значение с задержкой
    const updateSearch = useMemo(
        () =>
            debounce((value: string) => {
                setDebouncedSearch(value.toLowerCase());
            }, 300),
        []
    );

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);
        updateSearch(value);
    };

    useEffect(() => {
        return () => {
            updateSearch.cancel(); // очистка debounce при размонтировании
        };
    }, [updateSearch]);

    const filteredTasks = tasks.filter((task) => {
        const due = new Date(task.dueDate);

        if (status === "completed" && !task.completed) return false;
        if (status === "notCompleted" && task.completed) return false;
        if (date === "today" && !isToday(due)) return false;
        if (date === "week" && !isThisWeek(due)) return false;
        if (date === "month" && !isThisMonth(due)) return false;
        if (date === "overdue" && (!isBefore(due, new Date()) || task.completed)) return false;

        if (
            (priority === "high" && task.priority !== "Высокий") ||
            (priority === "medium" && task.priority !== "Средний") ||
            (priority === "low" && task.priority !== "Низкий")
        )
            return false;

        // Поиск по заголовку
        if (debouncedSearch && !task.title.toLowerCase().includes(debouncedSearch)) return false;
        return true;
    });

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between gap-4">
                <Search />
                <Input
                    placeholder="Поиск задач по названию..."
                    value={search}
                    onChange={handleSearchChange}
                    className=""
                />

            </div>
            {filteredTasks.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-gray-500 mt-16">
                    <Inbox className="w-16 h-16 mb-4" />
                    <p className="text-lg text-center">Задачи не найдены</p>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {filteredTasks.map((task) => (
                        <Task key={task.id} {...task} />
                    ))}
                </div>
            )}
        </div>
    );
};
