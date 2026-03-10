"use client";

import { useAuth } from "@/context/AuthContext";

export default function Navbar(){

  const { logout } = useAuth();

  return(

    <div className="w-full bg-white shadow-md px-8 py-4 flex justify-between items-center">

      <h1 className="text-xl font-bold text-blue-600">
        Task Manager
      </h1>

      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>

    </div>

  )

}