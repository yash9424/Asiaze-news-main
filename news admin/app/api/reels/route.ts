import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Reel from '@/models/Reel';
import Tag from '@/models/Tag';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    
    const query: any = {};
    if (status && status !== 'all') {
      query.status = status;
    } else if (!status) {
      query.status = 'published';
    }
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
    
    let tagIds = [];
    if (data.tags && Array.isArray(data.tags)) {
      tagIds = await Promise.all(
        data.tags.map(async (tagName: string) => {
          let tag = await Tag.findOne({ name: tagName });
          if (!tag) {
            tag = await Tag.create({ 
              name: tagName, 
              slug: tagName.toLowerCase().replace(/\s+/g, '-'),
              isActive: true 
            });
          }
          return tag._id;
        })
      );
    }
    
    const reel = await Reel.create({
      ...data,
      tags: tagIds,
      updatedAt: new Date()
    });

    return NextResponse.json({ reel }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating reel:', error);
    return NextResponse.json({ error: error.message || 'Failed to create reel' }, { status: 500 });
  }
}
