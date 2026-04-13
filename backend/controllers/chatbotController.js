// backend/controllers/chatbotController.js

import ChatMessage from '../models/ChatMessage.js';
import { getChatbotResponse, getAIResponse } from '../services/chatbotService.js';

// Send message and get bot response
export const askChatbot = async (req, res) => {
  try {
    const { message, conversationId, language = 'ar' } = req.body;

    if (!message || message.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Message cannot be empty',
      });
    }

    // Get bot response using keyword matching or AI
    const botResponse = await getAIResponse(message, language);

    // Save to database (optional)
    if (conversationId) {
      try {
        await ChatMessage.create({
          conversationId,
          userMessage: message,
          botReply: botResponse.reply,
          language,
          category: botResponse.category,
          confidence: botResponse.confidence,
        });
      } catch (dbErr) {
        console.warn('Database save warning:', dbErr.message);
        // Continue without saving if DB fails
      }
    }

    res.json({
      success: true,
      reply: botResponse.reply,
      category: botResponse.category,
      confidence: botResponse.confidence,
    });
  } catch (err) {
    console.error('Chatbot error:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to process your message',
    });
  }
};

// Get chat history
export const getChatHistory = async (req, res) => {
  try {
    const { conversationId } = req.params;

    if (!conversationId) {
      return res.status(400).json({
        success: false,
        error: 'Conversation ID is required',
      });
    }

    const messages = await ChatMessage.find({ conversationId })
      .sort({ createdAt: 1 })
      .limit(50);

    res.json({
      success: true,
      messages,
      count: messages.length,
    });
  } catch (err) {
    console.error('Get history error:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve chat history',
    });
  }
};

// Clear chat history
export const clearChatHistory = async (req, res) => {
  try {
    const { conversationId } = req.params;

    if (!conversationId) {
      return res.status(400).json({
        success: false,
        error: 'Conversation ID is required',
      });
    }

    await ChatMessage.deleteMany({ conversationId });

    res.json({
      success: true,
      message: 'Chat history cleared',
    });
  } catch (err) {
    console.error('Clear history error:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to clear chat history',
    });
  }
};

// Get chat statistics
export const getChatStats = async (req, res) => {
  try {
    const totalMessages = await ChatMessage.countDocuments();
    const avgConfidence = await ChatMessage.aggregate([
      { $group: { _id: null, avgConfidence: { $avg: '$confidence' } } },
    ]);

    res.json({
      success: true,
      totalMessages,
      avgConfidence: avgConfidence[0]?.avgConfidence || 0,
    });
  } catch (err) {
    console.error('Stats error:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to get statistics',
    });
  }
};
