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

    // Convert relative URLs to absolute URLs
    const baseUrl = process.env.BASE_URL || 'https://asiaze.cloud';
    const newsWithFullUrls = news.map(item => ({
      ...item,
      image: item.image?.startsWith('http') || item.image?.startsWith('data:') ? item.image : `${baseUrl}${item.image}`
    }));

    return createCorsResponse({ news: newsWithFullUrls });
  } catch (error: any) {
    console.error('Error fetching news:', error);
    return createCorsErrorResponse(error.message || 'Failed to fetch news', 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    console.log('🔵 Starting POST /api/news');
    await dbConnect();
    console.log('🔵 DB connected');
    const data = await req.json();
    console.log('🔵 Received data:', JSON.stringify(data, null, 2));
    
    // Convert tag names to tag IDs
    let tagIds = [];
    if (data.tags && Array.isArray(data.tags)) {
      console.log('🔵 Processing tags:', data.tags);
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
      console.log('🔵 Tag IDs:', tagIds);
    }
    
    // Validate required fields
    if (!data.title || !data.category) {
      console.error('❌ Missing required fields');
      return createCorsErrorResponse('Title and category are required', 400);
    }

    console.log('🔵 Creating news document');
    const newsData = {
      title: data.title,
      content: data.content || '',
      summary: data.summary || '',
      explanation: data.explanation || '',
      image: data.image || '',
      category: data.category,
      tags: tagIds,
      status: data.status || 'draft',
      languages: data.languages || [],
      translations: data.translations || {},
      source: data.source || '',
      state: data.state || '',
      publishedAt: data.publishedAt || null,
      updatedAt: new Date()
    };
    
    const news = new News(newsData);
    
    news.markModified('translations');
    console.log('🔵 Saving news...');
    await news.save();
    
    console.log('✅ News created successfully');
    console.log('Languages:', news.languages);
    console.log('Translations:', news.translations);

    return createCorsResponse({ news }, { status: 201 });
  } catch (error: any) {
    console.error('❌ Error creating news:', error);
    console.error('❌ Error stack:', error.stack);
    console.error('❌ Error name:', error.name);
    return createCorsErrorResponse(error.message || 'Failed to create news', 500);
  }
}

export async function OPTIONS() {
  return handleOptionsRequest();
}
