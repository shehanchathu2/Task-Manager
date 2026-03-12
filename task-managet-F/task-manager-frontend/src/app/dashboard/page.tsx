"use client";

import { useEffect, useState } from "react";
import API from "@/services/api";
import { Task } from "@/types/task";
import TaskForm from "@/components/TaskForm";
import { X, Pencil, Trash } from "lucide-react";
import UpdateTaskForm from "@/components/UpdateTaskForm";
import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {

  const { fetchTasks, tasks, loading , fetchTasksFilter,token} = useAuth();

  const [show, setShow] = useState(false);
  const [updateShow, setUpdateShow] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [priorityFilter, setPriorityFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  
  const handleFilter = () => {
  fetchTasksFilter(priorityFilter, statusFilter);
};

  const deleteTask = async (id: number) => {
    if (confirm("Are you sure you want to delete this task?")) {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (

    <div className="min-h-screen bg-gray-50">

      <div className="max-w-6xl mx-auto p-8">

        <div className="flex justify-between items-center mb-10">

          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Task Dashboard
            </h1>

            <p className="text-gray-500 text-sm">
              Manage and track your tasks
            </p>
          </div>

          <button
            onClick={() => setShow(true)}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition shadow-sm"
          >
            + Add Task
          </button>

          
          
        </div>

        {show && (
          <TaskForm
            onClose={() => setShow(false)}
            onCreated={fetchTasks}
          />
        )}

        {loading && (
          <p className="text-gray-500 text-center py-10">
            Loading tasks...
          </p>
        )}

        {/* Empty */}
        {!loading && tasks.length === 0 && (
          <div className="bg-white border rounded-xl p-8 text-center shadow-sm">

            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              No Tasks Yet
            </h2>

            <p className="text-gray-500 text-sm">
              Click "Add Task" to create your first task.
            </p>

          </div>
        )}


        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {tasks.map((task) => (

            <div
              key={task.id}
              className="relative bg-white border rounded-xl p-5 hover:shadow-md transition"
            >


              <Pencil
                size={16}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
                onClick={() => {
                  setSelectedTask(task);
                  setUpdateShow(true);
                }}
              />

              <Trash
                size={16} className="absolute top-4 right-10 text-red-700 hover:text-gray-600 cursor-pointer"
                onClick={() => {
                  deleteTask(task.id);
                }}
              />

              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {task.title}
              </h3>


              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                {task.description}
              </p>


              <div className="flex justify-between mb-4">

                <span className={`text-xs px-3 py-1 rounded-full 
  ${task.status === "TODO" ? "bg-gray-100 text-gray-700" : ""}
  ${task.status === "IN_PROGRESS" ? "bg-yellow-100 text-yellow-700" : ""}
  ${task.status === "DONE" ? "bg-green-100 text-green-700" : ""}
`}>
                  {task.status}
                </span>

                <span
  className={`text-xs px-3 py-1 rounded-full ${
    task.priority === "HIGH"
      ? "bg-red-100 text-red-700"
      : task.priority === "MEDIUM"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-green-100 text-green-700"
  }`}
>
  {task.priority}
</span>

              </div>

              <div className="flex justify-between text-xs text-gray-400">

                <span>
                  Due: {task.dueDate?.slice(0, 10)}
                </span>

                <span>
                  {task.createdAt?.slice(0, 10)}
                </span>

              </div>

            </div>

          ))}

        </div>

      </div>
      {updateShow && selectedTask && (
        <UpdateTaskForm
          task={selectedTask}
          onClose={() => setUpdateShow(false)}
          onCreated={fetchTasks}
        />
      )}

    </div>


  );
}