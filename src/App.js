import React, {useState} from "react";
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import store from "./redux";
import {addTask, deleteTask, doDone, doImportant} from "./redux/reducers/tasks";


function App() {
    const dispatch = useDispatch();
    const totdos = useSelector((store)=>store.tasks.todos)

    const [task,setTask] = useState('');

    return (
    <div className="App">
        <div>
            <input type='text' value={task} onChange={(e)=>setTask(e.target.value)}/>
            <button type='button' onClick={()=>{
                dispatch(addTask(task));
                setTask('')
            }}>
            Add
            </button>
        </div>
        <ul>
            {totdos.map((item)=>
                (<li key={item.id} style={{margin: '20px 0',color:item.isImportant ? 'red': '' , textDecoration:item.isDone ? 'line-through': ''}}>{item.title}
                    <button style={{marginLeft: "40px"}} type='button' onClick={()=>dispatch((deleteTask(item.id)))}>Remove</button>
                    <button style={{marginLeft: "40px"}}  type='button' onClick={()=>dispatch((doImportant(item.id)))}>Important</button>
                    <button style={{marginLeft: "40px"}} type='button' onClick={()=>dispatch((doDone(item.id)))}>Done</button>
                </li>)
            )}
        </ul>
        <div>
            <input type='search'/>
            <button>Найти</button>
        </div>
    </div>
  );
}

export default App;
