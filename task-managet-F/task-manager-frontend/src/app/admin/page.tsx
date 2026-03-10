"use client";

import { useEffect,useState } from "react";
import API from "../../services/api";
import { Task } from "../../types/task";

export default function AdminPage(){

  const [tasks,setTasks] = useState<Task[]>([]);

  const fetchAllTasks = async () => {

    const res = await API.get("/tasks");

    setTasks(res.data.content);

  }

  useEffect(()=>{
    fetchAllTasks();
  },[])

  return(

    <div>

      <h2>Admin Task Panel</h2>

      {tasks.map(task =>(

        <div key={task.id}>

          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>

        </div>

      ))}

    </div>

  )

}