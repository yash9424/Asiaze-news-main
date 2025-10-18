import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Reel from '@/models/Reel';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    
    const query: any = {};
    if (status) query.status = status;
    if (category) query.category = category;

    const reels = await Reel.find(query)
      .populate('category')
      .populate('tags')
      .populate('author', 'name email')
      .sort({ createdAt: -1 });

    return NextResponse.json({ reels });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch reels' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const data = await req.json();
    
    const reel = await Reel.create({
      ...data,
      updatedAt: new Date()
    });

    return NextResponse.json({ reel }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create reel' }, { status: 500 });
  }
}
