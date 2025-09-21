import React from 'react'

const Task = ({data}) => {
    return (
        <div>
            <h3>{data.task}</h3>
                <div className="btn-todo">
                    <button>Update</button>
                    <button>Delete</button>
                </div>
        </div>
    )
}

export default Task
