import mongoose from 'mongoose';

const StorySchema = new mongoose.Schema({
  heading: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  videoUrl: { type: String },
  thumbnail: { type: String },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Story || mongoose.model('Story', StorySchema);
