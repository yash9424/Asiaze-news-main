import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['news', 'reel', 'general'], default: 'general' },
  targetId: { type: mongoose.Schema.Types.ObjectId },
  sentAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['sent', 'failed'], default: 'sent' }
});

export default mongoose.models.Notification || mongoose.model('Notification', NotificationSchema);
