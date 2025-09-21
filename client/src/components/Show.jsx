import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Task from "./Task";

const Show = () => {
    const [todoList, setTodoList] = useState([]);
    const [addNew , setAddNew] = useState(false);
    const [newTask , setNewTask] = useState("");

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

    const handleAddNew = async() =>{
        const res = await fetch("http://localhost:5000/todos/" ,  {
                method : "POST" ,

                headers : {
                    Authorization : token ,
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({task : newTask})      
            }
        );

        const data = res.json();
        setNewTask("");
        setAddNew(false);
        
    }

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
            {
                addNew && (
                    <>
                        <div className="addnew">
                            <input type="text" onChange={(e) => setNewTask(e.target.value)} value={newTask}/>
                            <button onClick={()=> handleAddNew()}>Add</button>
                        </div>
                    
                    </>
                )
            }
            <span onClick={()=>{setAddNew(!addNew)}}>{addNew ? "Hide" : "Add new"}</span>
        </div>
        </div>
    );
};

export default Show;
