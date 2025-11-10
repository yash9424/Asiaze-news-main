import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Story from '@/models/Story';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect();
  const { id } = await params;
  const story = await Story.findById(id).populate('category');
  if (!story) return NextResponse.json({ error: 'Story not found' }, { status: 404 });
  return NextResponse.json({ story });
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect();
  const { id } = await params;
  const body = await req.json();
  const story = await Story.findByIdAndUpdate(id, body, { new: true });
  if (!story) return NextResponse.json({ error: 'Story not found' }, { status: 404 });
  return NextResponse.json({ story });
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect();
  const { id } = await params;
  const story = await Story.findByIdAndDelete(id);
  if (!story) return NextResponse.json({ error: 'Story not found' }, { status: 404 });
  return NextResponse.json({ success: true });
}
