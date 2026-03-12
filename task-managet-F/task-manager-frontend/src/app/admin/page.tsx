"use client";

import { useEffect, useState } from "react";
import API from "../../services/api";
import { Task } from "../../types/task";

export default function AdminPage() {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAllTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data.content);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">

          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Admin Task Dashboard
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              View and monitor all tasks in the system
            </p>
          </div>

          <div className="mt-4 md:mt-0 bg-white border shadow-sm rounded-xl px-6 py-3 text-center">
            <p className="text-sm text-gray-500">Total Tasks</p>
            <p className="text-2xl font-bold text-blue-600">
              {tasks.length}
            </p>
          </div>

        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-20 text-gray-500">
            Loading tasks...
          </div>
        )}

        {/* Empty */}
        {!loading && tasks.length === 0 && (
          <div className="bg-white border rounded-xl p-10 text-center shadow-sm">
            <p className="text-gray-500">
              No tasks available
            </p>
          </div>
        )}

        {/* Task Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

          {tasks.map((task) => (

            <div
              key={task.id}
              className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition"
            >

              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {task.title}
              </h3>

              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                {task.description}
              </p>

              {/* Status + Priority */}
              <div className="flex justify-between mb-4">

                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium
                    ${task.status === "TODO" && "bg-gray-100 text-gray-700"}
                    ${task.status === "IN_PROGRESS" && "bg-yellow-100 text-yellow-700"}
                    ${task.status === "DONE" && "bg-green-100 text-green-700"}
                  `}
                >
                  {task.status}
                </span>

                {task.priority && (
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium
                      ${task.priority === "HIGH" && "bg-red-100 text-red-700"}
                      ${task.priority === "MEDIUM" && "bg-orange-100 text-orange-700"}
                      ${task.priority === "LOW" && "bg-blue-100 text-blue-700"}
                    `}
                  >
                    {task.priority}
                  </span>
                )}

              </div>

              {/* Dates */}
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

    </div>
  );
}