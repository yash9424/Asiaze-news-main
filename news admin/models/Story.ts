import mongoose from 'mongoose';

const StorySchema = new mongoose.Schema({
  storyName: { type: String },
  heading: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  videoUrl: { type: String },
  thumbnail: { type: String },
  mediaItems: [{
    id: String,
    type: { type: String, enum: ['image', 'video'] },
    url: String,
    thumbnail: String
  }],
  autoDeleteType: { type: String, enum: ['never', 'hours', 'days'], default: 'never' },
  deleteAfterHours: { type: Number },
  deleteAfterDate: { type: String },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Story || mongoose.model('Story', StorySchema);
