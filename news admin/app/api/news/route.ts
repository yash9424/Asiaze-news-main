import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import News from '@/models/News';
import Tag from '@/models/Tag';
import Category from '@/models/Category';
import { createCorsResponse, createCorsErrorResponse, handleOptionsRequest } from '@/lib/cors';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    // Ensure models are registered
    Category;
    Tag;
    
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const language = searchParams.get('language');
    const userState = searchParams.get('userState');
    
    const query: any = {};
    // If status is 'all', show all news (for admin panel)
    // If no status specified, only show published news (for mobile app)
    if (status && status !== 'all') {
      query.status = status;
    } else if (!status) {
      query.status = 'published';
    }
    // Skip category filter if it's 'story' (that's for stories, not news)
    if (category && category !== 'story') query.category = category;
    if (language) query.languages = language;

    let news = await News.find(query)
      .populate('category')
      .populate('tags')
      .lean()
      .sort({ publishedAt: -1, createdAt: -1 });

    // If userState is provided, filter to show only that state's news
    if (userState && userState !== '') {
      news = news.filter(n => n.state === userState || !n.state || n.state === '');
    }

    return createCorsResponse({ news });
  } catch (error: any) {
    console.error('Error fetching news:', error);
    return createCorsErrorResponse(error.message || 'Failed to fetch news', 500);
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
    
    const news = new News({
      ...data,
      tags: tagIds,
      updatedAt: new Date()
    });
    
    news.markModified('translations');
    await news.save();
    
    console.log('Created news with languages:', news.languages);
    console.log('Created news with translations:', news.translations);

    return createCorsResponse({ news }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating news:', error);
    return createCorsErrorResponse(error.message || 'Failed to create news', 500);
  }
}

export async function OPTIONS() {
  return handleOptionsRequest();
}
