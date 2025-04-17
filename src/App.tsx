import { Tasks } from "@/ui/Tasks";
import { Button } from "@/ui/shadcn/button";
import { Container } from "@/ui/Container";
import { DialogTask } from "@/ui/DialogTask";
import { Filters } from "@/ui/Filters";
import { useDialog } from "@/utils/hooks/useDialog";

export const App = () => {
    // диалог для создаания задачи
    const { isOpen, openDialog, closeDialog } = useDialog();

    return (
        <Container>
            <DialogTask
                open={isOpen}
                openDialog={openDialog}
                closeDialog={closeDialog}
                title="Новая задача"
                description="Заполните форму, чтобы создать задачу"
                submitButtonText="Создать задачу"
            />
            <h2 className="text-4xl font-bold mb-10 text-center">
                Список задач
            </h2>
            <Button onClick={openDialog}>Добавить новую задачу</Button>
            <Filters />
            <Tasks />
        </Container>
    );
};
