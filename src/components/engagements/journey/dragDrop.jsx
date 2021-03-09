import React, {useState} from 'react';


export default function TaskDragDrop(){
  
        const [tasks, setTasks] = useState(
            {name:'Task1',catagory:"todo"},
            {name:'Task2',catagory:"todo"},
            {name:'Task3',catagory:"todo"}
            );
   
        var task ={
            todo:[],
            complete:[]
        }
        
        const dragOver = (event) =>{
            event.PreventDefault();
        }     
        
        const dragStart = (event, id) =>{
            event.DataTransfer.setData("id", id);
        }

        Array.from(tasks).forEach(t =>
            task[t.catagory].push(
            <div key={t.name} draggable onDragStart={dragStart}>
                {t.name}
            </div>)
            )

    return(
       <div>
           
           <div className='todo' style={{height:'100px', width:'200px', backgroundColor:'skyblue',margin:'20px'}}>
               <p>To Do</p>
               <p>{task.todo}</p>
           </div>
           <div className='complete' onDragOver ={dragOver} style={{height:'200px', width:'200px', backgroundColor:'skyblue',margin:'20px'}}>
                <p>Completed</p>
                <p>{task.complete}</p>
           </div>
       </div>
    );
}