import React, {useState} from "react";

const TodoItem = ({ task, onDeleteTask, onToggleTask,onUpdatetask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const handleSave=()=>{
    if(editText.trim()){
       onUpdatetask(task.id,editText)
       setIsEditing(false)
    }else{
      setIsEditing(false)
    }
  }
  return (
    <li className="list-group-item d-flex justify-content-between">

        {isEditing ? (
            <div>
          <input
            type="text"
            className="form-control d-inline-block"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSave}
            onKeyDown={(e)=>{e.key=="Enter" && handleSave}}
            style={{width:"300px"}}
          ></input>
        <button onClick={()=>setIsEditing(false)} className = "btn btn-danger">X</button>
        </div>
        ) : (
          <div>
            <input
              type="checkbox"
              checked={task.completed}
              className="form-check-input me-2"
              onChange={() => {
                onToggleTask(task.id, task.completed);
              }}
            ></input>
            <span
            style={{
                textDecoration: task.completed ? "line-through" : "none",}}
            onDoubleClick={() => setIsEditing(true)}
            >
            {task.text}
            </span>
        </div>
        )}

    <button
        className="btn btn-danger"
        onClick={() => {onDeleteTask(task.id)}}>
        Delete
      </button>
    </li>
  );
};

export default TodoItem;