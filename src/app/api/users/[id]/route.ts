import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  return NextResponse.json({ message: `Mengambil data user ID: ${id}` });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const body = await request.json();
  
  return NextResponse.json({ message: `User ${id} berhasil diupdate`, data: body });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  
  return NextResponse.json({ message: `User ${id} berhasil dihapus` });
}
