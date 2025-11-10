import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
  await dbConnect();
  
  const users = await User.find({ role: 'user' }).select('name email wallet');
  
  const stats = await User.aggregate([
    { $match: { role: 'user' } },
    {
      $group: {
        _id: null,
        totalSavePoints: { $sum: '$wallet.savePoints' },
        totalSharePoints: { $sum: '$wallet.sharePoints' },
        totalReferralPoints: { $sum: '$wallet.referralPoints' },
        totalReferrals: { $sum: '$wallet.referrals' }
      }
    }
  ]);
  
  return NextResponse.json({
    users: users.map(u => ({
      id: u._id,
      userId: u._id,
      userName: u.name,
      email: u.email,
      balance: u.wallet?.balance || 0,
      transactions: u.wallet?.transactions || 0
    })),
    stats: stats[0] || { totalSavePoints: 0, totalSharePoints: 0, totalReferralPoints: 0, totalReferrals: 0 }
  });
}
