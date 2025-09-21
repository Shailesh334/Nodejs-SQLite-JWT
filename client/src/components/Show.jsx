import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Task from "./Task";

const Show = () => {
    const [todoList, setTodoList] = useState([]);

    const token = localStorage.getItem("token");

    const fetchTodos = async () => {
        const res = await fetch("http://localhost:5000/todos", {
        headers: {
            Authorization: token,
            "content-Type": "application/json",
        },
        });

        const data = await res.json();
        setTodoList(data);
    };


    useEffect(() => {
        fetchTodos();
    });


    return (
        <div className="todo">
        <div className="todo-container">
            <div className="task-container">
            {todoList.map((todo) => (
                <Task key={todo.id} data={todo} />
            ))}
            </div>
            <span>Add new</span>
        </div>
        </div>
    );
};

export default Show;
