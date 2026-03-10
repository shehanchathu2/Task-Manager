import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white shadow-xl rounded-xl p-10 text-center w-[400px]">

        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Task Manager
        </h1>

        <p className="text-gray-600 mb-8">
          Manage your tasks efficiently with our simple task management system.
        </p>

        <div className="flex flex-col gap-4">

          <Link href="/login">
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
              Login
            </button>
          </Link>

          <Link href="/register">
            <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
              Register
            </button>
          </Link>

        </div>

      </div>

    </main>
  );
}