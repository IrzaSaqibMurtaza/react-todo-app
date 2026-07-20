import React from 'react';
import edit from "../assets/icons8-edit-32 (1).png";
import trash from "../assets/delete.png";
import { useState } from 'react';

function Task(props) {

    const [editedText, setEditedText] = useState(props.task.text);

    return (
        <li className='flex justify-between items-center border-2 border-l-[#F68B81] rounded-[10px] p-2.5 bg-[#1D1D1D]'>

            <div className="left flex gap-2.5 items-center">

                <input className='w-6 h-6 accent-black border border-[#F68B81]' type="checkbox" checked={props.task.done}
                    onChange={() => props.toggleTask(props.task.id)} />

                {props.task.editing ? <input autoFocus className="text-white text-xl bg-transparent outline-none rounded focus:ring-2  focus:ring-[#F68B81]" type='text' value={editedText} onChange={(e)=>{setEditedText(e.target.value)}} onKeyDown={(e) => { if(e.key === "Enter"){props.saveTask(props.task.id, editedText)} }} onBlur={(e) => {props.saveTask(props.task.id, editedText)}}/> : <span className={`text-white text-xl ${props.task.done ? 'line-through decoration-red-500 decoration-4' : ''}`}>{props.task.text}</span>}


            </div>

            <div className="right flex gap-2.5 items-center">

                <button className="cursor-pointer hover:scale-105 transition-all duration-150 active:scale-90" onClick={() => props.editTask(props.task.id)}><img src={edit} alt="edit-icon" /></button>
                <button className="cursor-pointer border border-transparent hover:border-white hover:rounded-full hover:bg-[#ff000080] transition-all duration-150 hover:scale-105 active:scale-90" onClick={() => props.deleteTask(props.task.id)}><img src={trash} alt="delete-icon" /></button>

            </div>

        </li>

    )
}

export default Task