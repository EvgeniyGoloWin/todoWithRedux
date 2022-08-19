import React, {useState} from "react";
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import store from "./redux";
import tasks, {addTask, deleteTask, doDone, doImportant} from "./redux/reducers/tasks";


function App() {
    const [task,setTask] = useState('');
    const dispatch = useDispatch();
    const todos = useSelector((store)=>store.tasks.todos)
    // const EDIT = 'EDIT'

    function editTask(id) {
        console.log(todos,id)
        let curTask = todos.filter(item => item.id === id)[0]; // выбранный таск
        if(!curTask.classList.contains('edit')) { // При первом нажатии на кнопку редактирования, начинаем редактировать.
            curTask.classList.add('edit'); // Добавляем класс
            curTask.querySelector('.task').innerHTML = `<input type="text" value="${task[id].task}">`; // Вместо задачи добавляем инпут с редактированием
        } else { // При втором нажатии, когда класс `.edit` есть, мы сохраним
            let newTask = curTask.querySelector('.task > input').value;
            tasks[id].task = newTask;
            curTask.querySelector('.task').innerText = newTask;
            curTask.classList.remove('edit');
            // storage();
        }
    }

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
            {todos.map((item) =>
                (<li key={item.id} style={{margin: '20px 0',color:item.isImportant ? 'red': '' , textDecoration:item.isDone ? 'line-through': ''}}>{item.title}
                    <input  type='text' name='todo'/>
                    <button style={{marginLeft: "40px"}} type='button' onClick={()=>dispatch((editTask(item.id)))}>Edit</button>
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
