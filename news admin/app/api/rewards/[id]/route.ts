import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Reward from '@/models/Reward';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const body = await req.json();
  const reward = await Reward.findByIdAndUpdate(params.id, body, { new: true });
  if (!reward) {
    return NextResponse.json({ error: 'Reward not found' }, { status: 404 });
  }
  return NextResponse.json(reward);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const reward = await Reward.findByIdAndDelete(params.id);
  if (!reward) {
    return NextResponse.json({ error: 'Reward not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
