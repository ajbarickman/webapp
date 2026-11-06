import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { title } = await req.formData().then(fd => ({ title: fd.get("title") }));
  if (!title) return NextResponse.json({ error: "Missing" }, { status: 400 });
  const task = await prisma.task.create({ data: { title: title as string, userId: session.user.id } });
  return NextResponse.json(task);
}
