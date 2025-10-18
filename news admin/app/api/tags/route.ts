import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Tag from '@/models/Tag';

export async function GET() {
  try {
    await dbConnect();
    const tags = await Tag.find().sort({ name: 1 });
    return NextResponse.json({ tags });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tags' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const data = await req.json();
    const tag = await Tag.create(data);
    return NextResponse.json({ tag }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create tag' }, { status: 500 });
  }
}
