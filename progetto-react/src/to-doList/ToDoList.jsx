import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ tasks, onDeleteTask,onToggleTask, onUpdateTask}) => {
    return (
    <ul className="list-group">
        {tasks.map((t) => {
        return (
            <TodoItem key={t.id} task={t} onDeleteTask={onDeleteTask} onToggleTask={onToggleTask} onUpdateTask={onUpdateTask}></TodoItem>
        );
        })}
    </ul>
    );
};

export default TodoList;