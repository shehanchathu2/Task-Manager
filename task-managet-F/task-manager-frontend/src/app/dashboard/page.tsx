"use client";

import { useEffect, useState } from "react";
import API from "../../services/api";
import { Task } from "../../types/task";

export default function Dashboard() {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
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
    fetchTasks();
  }, []);

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Your Tasks
        </h1>

        {loading && (
          <p className="text-gray-500">Loading tasks...</p>
        )}

        {!loading && tasks.length === 0 && (
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <p className="text-gray-500">No tasks found.</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {tasks.map((task) => (

            <div
              key={task.id}
              className="bg-white rounded-xl shadow p-5 hover:shadow-lg transition"
            >

              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {task.title}
              </h3>

              <p className="text-gray-600 text-sm mb-4">
                {task.description}
              </p>

              <div className="flex justify-between items-center text-sm">

                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                  {task.status}
                </span>

                <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700">
                  {task.priority}
                </span>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );
}