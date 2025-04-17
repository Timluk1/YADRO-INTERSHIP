import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/ui/shadcn/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/ui/shadcn/form"
import { Input } from "@/ui/shadcn/input"
import { Popover, PopoverTrigger, PopoverContent } from "@/ui/shadcn/popover"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/ui/shadcn/calendar" 
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { useAppDispatch } from "@/utils/hooks/useAppDispatch"
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue} from "@/ui/shadcn/select"
import { addTask, updateTask } from "@/core/Tasks/TasksSlice"
import { ITask } from "@/core/Tasks/types"

const formSchema = z.object({
    title: z.string().min(3, {
        message: "Название должно состоять минимум из 3 символов",
    }),
    dueDate: z.date({
        message: "Выберите дату",
    }).min(new Date(), {
        message: "Дата должна быть больше текущей",
    }),
    priority: z.enum(["Низкий", "Средний", "Высокий"])
})

interface IDialogFormTaskProps {
    task?: ITask;
    closeDialog: () => void;
    sumbmitButtonText: string;
}

export const DialogFormTask: React.FC<IDialogFormTaskProps> = ({ task, closeDialog, sumbmitButtonText }) => {
    const dispatch = useAppDispatch();
    // определяем дефолтные значения в зависимоти от вида формы
    const defaultValues = task
        ? {
            title: task.title,
            dueDate: new Date(task.dueDate),
            priority: task.priority,
        }
        : {
            title: "",
            dueDate: undefined,
            priority: "Средний" as const,
        };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues,
    })


    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const parsedValues = {
            ...values,
            dueDate: values.dueDate.toISOString(),
        };
        // определя

        if (task) {
            dispatch(updateTask({ ...parsedValues, id: task.id, completed: task.completed }));
        } else {
            dispatch(addTask(parsedValues));
        }

        closeDialog();
    };


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Название задачи</FormLabel>
                            <FormControl>
                                <Input placeholder="Сделать уроки" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Дата окончания задачи</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={`w-full justify-start text-left font-normal ${!field.value && "text-muted-foreground"
                                            }`}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {field.value ? format(field.value, "PPP", { locale: ru }) : "Выберите дату"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Приоритет</FormLabel>
                            <FormControl>
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="По приоритету" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Низкий">Низкий</SelectItem>
                                        <SelectItem value="Средний">Средний</SelectItem>
                                        <SelectItem value="Высокий">Высокий</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button className="w-full" type="submit">
                    {sumbmitButtonText}
                </Button>
            </form>
        </Form>
    )
}
