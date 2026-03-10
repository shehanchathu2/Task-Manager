"use client";

import { useState } from "react";
import API from "../../services/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {

  const router = useRouter();

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");

  const register = async () => {

    try{

      await API.post("/auth/register",{
        name,
        email,
        password
      });

      router.push("/login");

    }catch(err){
      setError("Registration failed. Please try again.");
    }

  }

  return(

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-[380px]">

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">
            {error}
          </p>
        )}

        <div className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="Full Name"
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e)=>setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button
            onClick={register}
            className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Register
          </button>

        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>

      </div>

    </div>

  )

}