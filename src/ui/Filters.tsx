import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/ui/shadcn/select";
import { Label } from "@/ui/shadcn/label";

import { useAppDispatch } from "@/utils/hooks/useAppDispatch";
import {
    setStatusFilter,
    setDateFilter,
    setPriorityFilter,
    StatusFilter,
    DateFilter,
    PriorityFilter,
} from "@/core/Filters/FiltersSlice";
import { useAppSelector } from "@/utils/hooks/useAppSelector";

export const Filters = () => {
    const dispatch = useAppDispatch();
    const { status, date, priority } = useAppSelector((state) => state.filters);
    return (
        <div className="flex flex-wrap gap-4">
            <div className="flex flex-col gap-2">
                <Label className="text-sm">Статус</Label>
                <Select
                    value={status}
                    onValueChange={(value) =>
                        dispatch(setStatusFilter(value as StatusFilter))
                    }
                >
                    <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="Выберите статус" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Все</SelectItem>
                        <SelectItem value="completed">Выполнено</SelectItem>
                        <SelectItem value="notCompleted">
                            Не выполнено
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex flex-col gap-2">
                <Label className="text-sm">Дата</Label>
                <Select
                    value={date}
                    onValueChange={(value) =>
                        dispatch(setDateFilter(value as DateFilter))
                    }
                >
                    <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="По дате" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Все</SelectItem>
                        <SelectItem value="today">Сегодня</SelectItem>
                        <SelectItem value="week">Неделя</SelectItem>
                        <SelectItem value="month">Месяц</SelectItem>
                        <SelectItem value="overdue">Просроченные</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex flex-col gap-2">
                <Label className="text-sm">Приоритет</Label>
                <Select
                    value={priority}
                    onValueChange={(value) =>
                        dispatch(setPriorityFilter(value as PriorityFilter))
                    }
                >
                    <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="По приоритету" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Все</SelectItem>
                        <SelectItem value="high">Высокий</SelectItem>
                        <SelectItem value="medium">Средний</SelectItem>
                        <SelectItem value="low">Низкий</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};
