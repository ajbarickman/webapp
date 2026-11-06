import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

type Task = { id: string; title: string; completed: boolean; userId: string };

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");
  const tasks = await prisma.task.findMany({ where: { userId: session.user.id }, orderBy: { createdAt: "desc" } });
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <form action="/api/tasks" method="POST" className="mb-4 flex gap-2">
        <input name="title" placeholder="New task" required className="border p-2 rounded flex-1" />
        <button className="bg-blue-600 text-white px-4 rounded">Add</button>
      </form>
      <ul className="space-y-2">
        {tasks.map((t: Task) => (
          <li key={t.id} className="flex items-center gap-2 bg-white p-2 rounded shadow">
            <input type="checkbox" defaultChecked={t.completed} onChange={async () => {
              await fetch(`/api/tasks/${t.id}`, { method: "PATCH", body: JSON.stringify({ completed: !t.completed }) });
            }} />
            <span className={t.completed ? "line-through" : ""}>{t.title}</span>
            <button className="ml-auto text-red-600" onClick={async () => {
              await fetch(`/api/tasks/${t.id}`, { method: "DELETE" });
            }}>Delete</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
