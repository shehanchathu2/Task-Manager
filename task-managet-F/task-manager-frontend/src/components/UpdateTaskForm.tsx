"use client";

import { useState } from "react";
import API from "../services/api";
import { X, Pencil } from "lucide-react";
import { Task } from "@/types/task";

interface Props {
  task: Task;
  onClose: () => void;
  onCreated: () => void;
}

export default function UpdateTaskForm({ onClose, onCreated, task }: Props) {

  const [title, setTitle] = useState(task.title || "");
  const [description, setDescription] = useState(task.description || "");
  const [dueDate, setDueDate] = useState(task.dueDate ? task.dueDate.slice(0, 10) : "");
  const [priority, setPriority] = useState(task.priority || "LOW");
  const [status, setStatus] = useState(task.status || "TODO");

  const updateTask = async () => {

    if (!title || !dueDate) {
      alert("Title and Due Date are required");
      return;
    }

    await API.put(`/tasks/${task.id}`, {
      title,
      description,
      dueDate: dueDate + "T00:00:00",
      priority,
      status
    });

    onCreated();
    onClose();
  };

  return (

    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-100">

      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative">

        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Update Task
        </h2>

        <div className="flex flex-col gap-4">


          <div>
            <label className="text-sm text-gray-600 font-medium">
              Title
            </label>
            <input
              type="text"
              value={title}
              placeholder="Enter task title"
              className="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 font-medium">
              Description
            </label>
            <textarea
              placeholder="Enter task description"
              value={description}
              rows={3}
              className="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>


          <div>
            <label className="text-sm text-gray-600 font-medium">
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              className="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>


          <div>
            <label className="text-sm text-gray-600 font-medium">
              Priority
            </label>
            <select
              value={priority}

              onChange={(e) => setPriority(e.target.value)}
              className="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="LOW">Low Priority</option>
              <option value="MEDIUM">Medium Priority</option>
              <option value="HIGH">High Priority</option>
            </select>
          </div>


          <div>
  <label className="text-sm text-gray-600 font-medium">
    Status
  </label>

  <select
    value={status}
    onChange={(e) => setStatus(e.target.value)}
    className="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
  >
    <option value="TODO">Todo</option>
    <option value="IN_PROGRESS">In Progress</option>
    <option value="DONE">Done</option>
  </select>
</div>

        </div>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700"
          >
            Cancel
          </button>

          <button
            onClick={updateTask}
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            Update Task
          </button>

        </div>

      </div>

    </div>

  );
}