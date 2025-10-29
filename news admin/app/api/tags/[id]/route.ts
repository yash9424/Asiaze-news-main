import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Tag from '@/models/Tag';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const body = await request.json();
  if (body.name) {
    body.slug = body.name.toLowerCase().replace(/\s+/g, '-');
  }
  body.updatedAt = new Date();
  const tag = await Tag.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(tag);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  await Tag.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}
