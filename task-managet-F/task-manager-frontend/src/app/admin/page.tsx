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
    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Admin Task Panel
          </h1>

          <div className="bg-white shadow px-4 py-2 rounded-lg">
            <span className="text-gray-600 text-sm">
              Total Tasks
            </span>
            <p className="text-xl font-bold text-blue-600">
              {tasks.length}
            </p>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-gray-500">Loading tasks...</p>
        )}

        {/* Empty State */}
        {!loading && tasks.length === 0 && (
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <p className="text-gray-500">No tasks available</p>
          </div>
        )}

        {/* Task Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {tasks.map((task) => (

            <div
              key={task.id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >

              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {task.title}
              </h3>

              <p className="text-gray-600 text-sm mb-4">
                {task.description}
              </p>

              <div className="flex justify-between items-center">

                <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                  {task.status}
                </span>

                {task.priority && (
                  <span className="px-3 py-1 text-xs rounded-full bg-purple-100 text-purple-700">
                    {task.priority}
                  </span>
                )}

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}