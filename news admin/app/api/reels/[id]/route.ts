import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Reel from '@/models/Reel';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const reel = await Reel.findById(params.id)
      .populate('category')
      .populate('tags')
      .populate('author', 'name email');

    if (!reel) {
      return NextResponse.json({ error: 'Reel not found' }, { status: 404 });
    }

    return NextResponse.json({ reel });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch reel' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const data = await req.json();
    
    const reel = await Reel.findByIdAndUpdate(
      params.id,
      { ...data, updatedAt: new Date() },
      { new: true }
    );

    if (!reel) {
      return NextResponse.json({ error: 'Reel not found' }, { status: 404 });
    }

    return NextResponse.json({ reel });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update reel' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const reel = await Reel.findByIdAndDelete(params.id);

    if (!reel) {
      return NextResponse.json({ error: 'Reel not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Reel deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete reel' }, { status: 500 });
  }
}
