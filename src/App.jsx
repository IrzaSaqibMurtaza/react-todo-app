import './App.css';
import add from "./assets/plus.png";
import Task from './components/Task.jsx';
import { useState, useEffect } from 'react';

function App() {

  const [text, setText] = useState("");
  const [tasks, setTasks] = useState(() => {
    const data = localStorage.getItem("tasks");
    return data ? JSON.parse(data) : [];
  });

  function addTask() {
    if (!text.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: text, done: false, editing: false },]);
    setText("");
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task))
    )

  }

  function deleteTask(id) {
    setTasks(
      tasks.filter(task => task.id !== id)
    )
  }

  function editTask(id) {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, editing: true } : task))
    )
  }

  function saveTask(id, editedText) {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, text: editedText.trim() ? editedText : task.text, editing: false } : task))
    )
  }

  function clearDone() {
    setTasks(
      tasks.filter(task => !task.done)
    )
  }

  const itemsLeft = tasks.filter(task => !task.done).length;

  const [filter, setFilter] = useState("All");

  const filteredTasks = filter === "To-Do" ? (tasks.filter(task => !task.done)) : (filter === "Done" ? tasks.filter(task => task.done) : tasks);
  const emptyMessage = filter === "To-Do" ? "No pending tasks. Enjoy the break!" : (filter === "Done" ? "Check off a task to see it here." : "No tasks yet. Time to get started!")

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);


  return (
    <>
      <div className="border-3 border-[#3F4045] rounded-xl min-h-130 w-full max-w-2xl bg-black">

        <header className="bg-[#F68B81] rounded-t-xl flex justify-center items-center font-semibold h-20 text-[clamp(24px,5vw,35px)]">ToDo App</header>

        <div className="p-3.5 border border-b-[#3F4045] w-full flex justify-center items-center gap-2.5 max-[400px]:flex-col">

          <input className="border-2 border-[#5a5a5e] rounded-[10px] text-white p-2.5 flex-1 min-w-0 w-full" type="text" placeholder="What needs to be done?" value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { addTask() } }} />

          <button className="flex justify-center items-center cursor-pointer hover:scale-105 transition-all duration-150 active:scale-90" onClick={addTask}><img src={add} alt="plus" /></button>

        </div>

        <div className='flex items-center gap-7 p-3.5 justify-center border border-b-[#3F4045] max-[342px]:flex-col'>

          <button className={` hover:text-black cursor-pointer text-[20px] border border-[#F68B81] rounded-full pl-3 pr-3 hover:bg-[#F68B81] hover:scale-105 transition-all duration-150 active:scale-95 ${filter === 'All' ? 'bg-[#F68B81] text-black outline-2 outline-[#F68B81] outline-offset-2' : 'text-white'}`} onClick={() => setFilter("All")}>All</button>
          <button className={`hover:text-black cursor-pointer text-[20px] border border-[#F68B81] rounded-full pl-3 pr-3 hover:bg-[#F68B81] hover:scale-105 transition-all duration-150 active:scale-95 ${filter === 'To-Do' ? 'bg-[#F68B81] text-black outline-2 outline-[#F68B81] outline-offset-2' : 'text-white'}`} onClick={() => setFilter("To-Do")}>To-Do</button>
          <button className={`hover:text-black cursor-pointer text-[20px] border border-[#F68B81] rounded-full pl-3 pr-3 hover:bg-[#F68B81] hover:scale-105 transition-all duration-150 active:scale-95 ${filter === 'Done' ? 'bg-[#F68B81] text-black outline-2 outline-[#F68B81] outline-offset-2' : 'text-white'}`} onClick={() => setFilter("Done")}>Done</button>

        </div>

        <div className="tasks-box h-55 overflow-y-auto scrollbar-thin scrollbar-thumb-[#F68B81] scrollbar-track-[black]">

          {
            filteredTasks.length > 0 ?
              <ul className='border-2 pt-4 pb-4 pr-2.5 pl-2.5 list-none flex flex-col gap-2'>
                {
                  filteredTasks.map((task) => {
                    return <Task key={task.id} task={task} toggleTask={toggleTask} deleteTask={deleteTask} editTask={editTask} saveTask={saveTask} />
                  })
                }
              </ul>
              : <div className='h-full flex justify-center items-center text-white text-xl p-3'>{emptyMessage}</div>

          }


        </div>

        <footer className='flex justify-between p-3.5 items-center border border-[#3F4045] rounded-b-xl max-[342px]:flex-col gap-1.5'>

          <p className='text-white'>{`${itemsLeft} task${itemsLeft === 1 ? "" : "s"} left`}</p>
          <button className='text-white border border-[#F68B81] rounded-[5px] p-1.5 cursor-pointer transition-all duration-150 hover:text-black hover:scale-105 hover:bg-[#F68B81] active:scale-95' onClick={clearDone}>Clear Done</button>

        </footer>

      </div>
    </>
  )
}

export default App
