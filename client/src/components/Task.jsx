import React from 'react'
import { useState } from 'react'

const Task = ({data , refresh }) => {
    const [updatedTask , setUpdatedTask] = useState(data.task);
    const [update , setUpdate] = useState(false);
    const token = localStorage.getItem("token")
    if(data.task === "")return;


    const handleUpdate = async() =>{
        const res = await fetch(`http://localhost:5000/todos/${data.id}?page=4`, {
            method: "PUT" ,
            headers : {
                Authorization: token,
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({ task: updatedTask })
        })

        const result = await res.json()
        setUpdate(!update)
        refresh();
        console.log(result);
    }

    const handleDelete = async ()=>{
        const res = await fetch(`http://localhost:5000/todos/${data.id}` , {
            method : "DELETE",
            headers : {
                "Authorization" : token ,
                "Content-Type" : "application/json"
            } 
        })
        
        const result = res.json();
        console.log(result);
        refresh();
    }

    return (
        <>
        {
            
            !update ?  (
                <div className="task">
                    <h3>{data.task}</h3>
                        <div className="btn-todo">
                            <button onClick={()=> {setUpdate(true)}}>Update</button>
                            <button onClick={handleDelete}>Delete</button>
                        </div>
                </div>
            ) : (

                <div className="task">
                    <input type="text" onChange={(e) => setUpdatedTask(e.target.value)} value={updatedTask}/>
                        <div className="btn-todo">
                                <button onClick={handleUpdate}>Save</button>
                                <button onClick={() => setUpdate(false)}>Cancel</button>
                        </div>
                </div>
                
            )
            
        }
    </>
    )
}

export default Task
