"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [csrf, setCsrf] = useState("");
  useEffect(() => {
    fetch("/api/auth/csrf").then(r => r.json()).then(d => setCsrf(d.csrfToken));
  }, []);
  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <form action="/api/auth/callback/credentials" method="POST" className="bg-white p-6 rounded shadow w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold">Login</h1>
        <input type="hidden" name="csrfToken" value={csrf} />
        <input name="email" type="email" placeholder="Email" required className="w-full border p-2 rounded" />
        <input name="password" type="password" placeholder="Password" required className="w-full border p-2 rounded" />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Login</button>
        <p className="text-sm">No account? <Link href="/register" className="underline">Register</Link></p>
      </form>
    </main>
  );
}
