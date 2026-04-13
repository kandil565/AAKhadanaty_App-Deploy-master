// backend/models/ChatMessage.js

import mongoose from 'mongoose';

const ChatMessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
      required: true,
      index: true,
    },
    userMessage: {
      type: String,
      required: true,
    },
    botReply: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      enum: ['ar', 'en'],
      default: 'ar',
    },
    category: {
      type: String,
      enum: [
        'price',
        'services',
        'booking',
        'hours',
        'location',
        'payment',
        'account',
        'support',
        'default',
      ],
      default: 'default',
    },
    confidence: {
      type: Number,
      min: 0,
      max: 100,
      default: 85,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    feedback: {
      type: String,
      enum: ['helpful', 'not_helpful', null],
      default: null,
    },
  },
  { timestamps: true }
);

// Index for faster queries
ChatMessageSchema.index({ conversationId: 1, createdAt: -1 });
ChatMessageSchema.index({ userId: 1, createdAt: -1 });
ChatMessageSchema.index({ category: 1 });

// Auto-delete messages older than 90 days
ChatMessageSchema.index(
  { createdAt: 1 },
  {
    expireAfterSeconds: 7776000, // 90 days
  }
);

export default mongoose.model('ChatMessage', ChatMessageSchema);
