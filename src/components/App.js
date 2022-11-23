import { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebaseData.js";
import { Audio } from 'react-loader-spinner'
;
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import del from '../containers/src/delete.png'
import edit from '../containers/src/edit.png'
function App() {
  const [loading,setLoading]= useState(false)
  const [newTask, setNewTask] = useState("");
  const [updatedTask,setUpdatedTask]= useState("");
  const [tasks, setTasks] = useState([]); 
  const TaskCollectionRef = collection(db, "toDo"); //reference to db
  //create task
  const createTask = async () => {
    if(newTask){
    await addDoc(TaskCollectionRef, { task: newTask });
    window.location.reload(false)}
    else{alert('enter valid task')}
  };
  //update task
  const updateTask = async (id, x) => {
    const userDoc = doc(db, "toDo", id);
    const newFields = { task: x };
    await updateDoc(userDoc, newFields);
    window.location.reload(false)
  };
  //delete task
  const deleteTask = async (id) => {
    const userDoc = doc(db, "toDo", id);
    await deleteDoc(userDoc);
    window.location.reload(false)
  };
  document.title = 'toDoo';
  
  useEffect(() => {
    setLoading(true)
    setTimeout(()=>{
        setLoading(false)
    },5000)
    const getTasks = async () => {
      const data = await getDocs(TaskCollectionRef);
      setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getTasks();
  }, []);
  
  var i=1;

  return (
    <div className="App">
      
      <div className="AddTask">
      <input
        placeholder="Add a new task"
        onChange={(event) => {
          setNewTask(event.target.value);
        }}
        onKeyDown={(e)=> {
            if (e.key === 'Enter') { 
            if(newTask){createTask()}
            else{alert('enter valid task')}
              }}}
      />
      <button id='createButton' role="button" onClick={createTask}><span class="text">+</span></button>
      </div>
      {tasks.map((x) => {
        return (
          <div>
            {" "}
            <input type='checkbox' id='chck'></input><input  placeholder={x.task} 
              onKeyDown={(e)=> {
            if (e.key === 'Enter') { 
            if(updatedTask){updateTask(x.id,updatedTask)}
            else{alert('enter valid update')}
            }}} 
             onChange={(event) => {
              setUpdatedTask(event.target.value);
        }}></input>
            
            
            <button id="noviButton"
              
              onClick={() => {
                if(updatedTask){updateTask(x.id,updatedTask)}
                else{alert('enter valid update')}
              }}
            >
              <img src={edit} id='buttonImg'></img>            </button>
            <button id='noviButton'
              onClick={() => {
                deleteTask(x.id);
              }}>
              {" "}
              <img src={del} id='buttonImg'></img>
            </button>
          </div>
        );
      })}
      
    </div>

  );
}

export default App;