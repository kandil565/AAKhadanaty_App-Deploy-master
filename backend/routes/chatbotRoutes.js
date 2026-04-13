// backend/routes/chatbotRoutes.js

import express from 'express';
import * as chatbotController from '../controllers/chatbotController.js';

const router = express.Router();

// Public endpoints (no auth required)
/**
 * @route POST /api/chatbot/ask
 * @desc Send message to chatbot and get response
 * @body { message: string, conversationId?: string, language?: 'ar'|'en' }
 * @returns { success: bool, reply: string, category: string, confidence: number }
 */
router.post('/ask', chatbotController.askChatbot);

/**
 * @route GET /api/chatbot/history/:conversationId
 * @desc Get chat history for a conversation
 * @returns { success: bool, messages: array, count: number }
 */
router.get('/history/:conversationId', chatbotController.getChatHistory);

/**
 * @route DELETE /api/chatbot/clear/:conversationId
 * @desc Clear chat history
 * @returns { success: bool, message: string }
 */
router.delete('/clear/:conversationId', chatbotController.clearChatHistory);

/**
 * @route GET /api/chatbot/stats
 * @desc Get chatbot statistics
 * @returns { success: bool, totalMessages: number, avgConfidence: number }
 */
router.get('/stats', chatbotController.getChatStats);

export default router;
