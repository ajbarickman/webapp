import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-4">Task Manager</h1>
      {session ? (
        <div className="text-center">
          <p className="mb-2">Welcome, {session.user?.email}</p>
          <Link href="/dashboard" className="text-blue-600 underline">Go to Dashboard</Link>
        </div>
      ) : (
        <Link href="/login" className="text-blue-600 underline">Login</Link>
      )}
    </main>
  );
}
