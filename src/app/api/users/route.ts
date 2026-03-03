import { NextResponse } from "next/server";

let users = [
  { id: "1", name: "Budi Santoso", email: "budi@example.com", role: "Admin" },
  { id: "2", name: "Siti Aminah", email: "siti@example.com", role: "Editor" },
];

export async function GET() {
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newUser = {
      id: (users.length + 1).toString(),
      ...body,
    };
    users.push(newUser);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Gagal menambah user" }, { status: 400 });
  }
}
