import { useState } from "react";
import TodoItem from "../TodoItem/TodoItem";
import { MdArrowForward } from "react-icons/md";
import { Reorder } from "framer-motion";
import "./Todo.css";

export interface ITodo {
    id: string;
    name: string;
    isEnd: boolean;
}

export default function Todo() {
    const [todos, setTodos] = useState<ITodo[]>([]);
    const [completedCount, setCompletedCount] = useState<number>(0);
    const [activeCount, setActiveCount] = useState<number>(0);
    const [textTodo, setTextTodo] = useState<string>("");

    const handleAdd = () => {
        if (textTodo) {
            const newTodo = { id: Date.now().toString(), name: textTodo, isEnd: false };
            setTodos((prev) => [newTodo, ...prev]);
            setTextTodo("");
            setActiveCount(activeCount + 1);
        }
    };

    const handleDone = (index: number): void => {
        setTodos((prevTodos) => {
            const updatedTodos = [...prevTodos];
            const isEnd = updatedTodos[index].isEnd;
            updatedTodos[index] = { ...updatedTodos[index], isEnd: !isEnd };
            setActiveCount(activeCount + (isEnd ? 1 : -1));
            setCompletedCount(completedCount + (isEnd ? -1 : 1));
            return updatedTodos;
        });
    };

    const handleDelete = (index: number): void => {
        const isEnd = todos[index].isEnd;
        setTodos((prev) => prev.filter((_, todoIndex) => todoIndex !== index));
        setActiveCount(activeCount - (!isEnd ? 1 : 0));
        setCompletedCount(completedCount - (isEnd ? 1 : 0));
    };

    return (
        <div className="todo">
            <h1 className="todo__title">Todo list</h1>
            <div className="todo__status">
                <p>Completed: {completedCount}</p>
                <p>Active: {activeCount}</p>
            </div>
            <div className="todo__input">
                <input
                    onChange={(e) => setTextTodo(e.target.value)}
                    value={textTodo}
                    type="text"
                    placeholder="What needs to be done?"
                />
                <button onClick={handleAdd} className="add-button">
                    <MdArrowForward />
                </button>
            </div>
            <Reorder.Group as="ul" className="todo__list" axis="y" onReorder={setTodos} values={todos}>
                {todos.map((todo, index) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onDelete={() => handleDelete(index)}
                        onDone={() => handleDone(index)}
                    />
                ))}
            </Reorder.Group>
        </div>
    );
}
