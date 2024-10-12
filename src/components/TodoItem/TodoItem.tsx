import { FaTrash } from "react-icons/fa";
import { Reorder } from "framer-motion";
import { ITodo } from "../Todo/Todo";
import "./TodoItem.css";

interface ITodoItem {
    todo: ITodo,
    onDelete: () => void,
    onDone: () => void,
}

export default function TodoItem({ todo, onDelete, onDone }: ITodoItem) {
    return (
        <Reorder.Item value={todo}>
            <div className={`todo-item ${todo.isEnd ? "completed" : ""}`}>
                <input
                    onChange={onDone}
                    checked={todo.isEnd}
                    className="todo-item__input"
                    type="checkbox"
                />
                <span>{todo.name}</span>
                <FaTrash onClick={onDelete} className="todo-item__delete" />
            </div>
        </Reorder.Item>
    );
}
