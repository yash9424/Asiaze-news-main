import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const { action, amount } = await req.json();
  
  const user = await User.findById(params.id);
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  
  if (action === 'increase') {
    user.wallet.balance += amount;
  } else if (action === 'decrease') {
    user.wallet.balance = Math.max(0, user.wallet.balance - amount);
  }
  
  user.wallet.transactions += 1;
  await user.save();
  
  return NextResponse.json({ success: true, balance: user.wallet.balance });
}
