import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Story from '@/models/Story';

export async function GET() {
  await dbConnect();
  const stories = await Story.find().sort({ createdAt: -1 });
  return NextResponse.json({ stories });
}

export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();
  const story = await Story.create(body);
  return NextResponse.json({ story }, { status: 201 });
}
