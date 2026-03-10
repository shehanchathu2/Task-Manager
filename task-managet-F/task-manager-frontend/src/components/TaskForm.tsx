"use client";

import { useState } from "react";
import API from "../services/api";

export default function TaskForm(){

  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");

  const createTask = async () => {

    await API.post("/tasks",{
      title,
      description,
      status:"TODO",
      priority:"MEDIUM"
    });

    alert("Task created");

  }

  return(

    <div>

      <h3>Create Task</h3>

      <input placeholder="Title"
      onChange={(e)=>setTitle(e.target.value)} />

      <input placeholder="Description"
      onChange={(e)=>setDescription(e.target.value)} />

      <button onClick={createTask}>
        Create
      </button>

    </div>

  )

}