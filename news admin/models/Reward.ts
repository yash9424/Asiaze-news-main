import mongoose from 'mongoose';

const rewardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  points: { type: Number, required: true },
  available: { type: Boolean, default: true },
  redeemed: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Reward || mongoose.model('Reward', rewardSchema);
