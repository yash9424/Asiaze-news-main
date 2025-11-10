import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect();
  const { id } = await params;
  const { action, amount } = await req.json();
  
  console.log(`🔄 Adjusting wallet for user ${id}: ${action} ${amount}`);
  
  const user = await User.findById(id);
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  
  if (!user.wallet) {
    user.wallet = { balance: 0, savePoints: 0, sharePoints: 0, referralPoints: 0, transactions: 0, referrals: 0 };
  }
  
  const oldBalance = user.wallet.balance;
  
  if (action === 'increase') {
    user.wallet.balance += amount;
  } else if (action === 'decrease') {
    user.wallet.balance = Math.max(0, user.wallet.balance - amount);
  }
  
  user.wallet.transactions += 1;
  await user.save();
  
  console.log(`✅ Wallet updated: ${oldBalance} → ${user.wallet.balance} (saved to DB)`);
  
  return NextResponse.json({ success: true, balance: user.wallet.balance });
}
