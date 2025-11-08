import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import News from '@/models/News';
import Tag from '@/models/Tag';
import Category from '@/models/Category';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    
    const query: any = {};
    // If status is 'all', show all news (for admin panel)
    // If no status specified, only show published news (for mobile app)
    if (status && status !== 'all') {
      query.status = status;
    } else if (!status) {
      query.status = 'published';
    }
    if (category) query.category = category;

    const news = await News.find(query)
      .lean()
      .sort({ publishedAt: -1, createdAt: -1 });

    return NextResponse.json({ news });
  } catch (error: any) {
    console.error('Error fetching news:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch news' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const data = await req.json();
    console.log('Received data:', data);
    
    // Convert tag names to tag IDs
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
    
    const newsData = {
      ...data,
      tags: tagIds,
      updatedAt: new Date()
    };
    console.log('Creating news with data:', newsData);
    
    const news = await News.create(newsData);
    console.log('Created news:', news);

    return NextResponse.json({ news }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating news:', error);
    return NextResponse.json({ error: error.message || 'Failed to create news' }, { status: 500 });
  }
}
