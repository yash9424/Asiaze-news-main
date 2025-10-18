import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import News from '@/models/News';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    
    const query: any = {};
    if (status) query.status = status;
    if (category) query.category = category;

    const news = await News.find(query)
      .populate('category')
      .populate('tags')
      .populate('author', 'name email')
      .sort({ createdAt: -1 });

    return NextResponse.json({ news });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const data = await req.json();
    
    const news = await News.create({
      ...data,
      updatedAt: new Date()
    });

    return NextResponse.json({ news }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create news' }, { status: 500 });
  }
}
