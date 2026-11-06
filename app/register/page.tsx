import { redirect } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  async function register(formData: FormData) {
    "use server";
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    if (res.ok) redirect("/login");
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <form action={register} className="bg-white p-6 rounded shadow w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold">Register</h1>
        <input name="email" type="email" placeholder="Email" required className="w-full border p-2 rounded" />
        <input name="password" type="password" placeholder="Password" required className="w-full border p-2 rounded" />
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">Register</button>
        <p className="text-sm">Have account? <Link href="/login" className="underline">Login</Link></p>
      </form>
    </main>
  );
}
