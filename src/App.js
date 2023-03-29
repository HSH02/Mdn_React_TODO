import React, { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";

import FilterButton from "./components/FilterButton";
import Form from "./components/Form"
import Todo from "./components/Todo";

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  completed: (task) => task.completed
}

const FILTER_NAMES = Object.keys(FILTER_MAP);

function usePrevious(value){
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }); 
  return ref.current;
}

function App(props) {  
  const [tasks, setTasks ] = useState(props.tasks);

  const [filter, setFilter] = useState('All');
  const listHeadingRef = useRef(null);
  
  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton 
        key={name}
        name={name}
        isPressed={name === filter}
        setFilter={setFilter}
    />
  ));
  
  function addTask(name){
    console.log(tasks);
    const newTask = { id: `todo-${nanoid()}`,name, completed:false};
    setTasks([...tasks, newTask]);    
  }
    
  function toggleTaskCompleted(id) {
  const updatedTasks = tasks.map((task) => {
        if( id === task.id){
          return {...task, completed: !task.completed}
        }
        return task;
      });
    setTasks(updatedTasks)    
  }

  function deleteTask(id){
    const remianingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remianingTasks);
  }

  const taskList = 
    tasks
  .filter(FILTER_MAP[filter])
  .map((task) => 
    <Todo 
        id={task.id}
        name={task.name} 
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
    />
  );

  function editTask(id, newName){
    const editecdTaskList = tasks.map((task) => {
        if(id === task.id){
          return {...task, name: newName};
        }
        return task;
    });
    setTasks(editecdTaskList)
  }

  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;
  
  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask}/>    
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>  
        {headingText} 
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}                           
      </ul>
    </div>
  );
}

export default App;


