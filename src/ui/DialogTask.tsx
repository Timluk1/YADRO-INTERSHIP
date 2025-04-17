import {
    Dialog,
    DialogHeader,
    DialogTitle,
    DialogContent,
    DialogDescription,
} from "@/ui/shadcn/dialog";
import { DialogFormTask } from "./DialogFormTask";
import { ITask } from "@/core/Tasks/types";

interface IDialogTaskProps {
    // работа с диалогом
    open: boolean;
    openDialog: () => void;
    closeDialog: () => void;
    // текстовые поля
    title: string;
    description: string;
    submitButtonText: string;
    // передача задачи в форму
    task?: ITask;
}

export const DialogTask: React.FC<IDialogTaskProps> = ({
    open,
    openDialog,
    closeDialog,
    title,
    description,
    submitButtonText,
    task,
}) => {
    return (
        <Dialog
            open={open}
            onOpenChange={(open) => (open ? openDialog() : closeDialog())}
        >
            <DialogContent
                onOpenAutoFocus={(e) => e.preventDefault()}
                className="sm:max-w-[425px]"
            >
                <DialogHeader>
                    <DialogTitle className="text-2xl text-center">
                        {title}
                    </DialogTitle>
                    <DialogDescription className="text-sm mt-3 text-center">
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <DialogFormTask
                    closeDialog={closeDialog}
                    task={task}
                    sumbmitButtonText={submitButtonText}
                />
            </DialogContent>
        </Dialog>
    );
};
