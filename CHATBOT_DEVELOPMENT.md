# 1️⃣ CHATBOT INTELLIGENCE - ملف التطوير الكامل

## 📝 متطلبات الشات الذكي

```
المميزات:
✅ إدخال نص حر من المستخدم
✅ معالجة طبيعية للغة
✅ ردود ذكية وسريعة
✅ تعلم من المحادثات
✅ تاريخ المحادثات
```

---

## 🔧 الملفات المطلوبة

### 1. Frontend Component: ChatbotAdvanced.tsx

```typescript
// src/components/ChatbotAdvanced.tsx

import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, Loader } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
  confidence?: number; // دقة الرد (0-100)
}

export default function ChatbotAdvanced() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // تمرير تلقائي للأسفل
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // إرسال الرسالة
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;

    // إضافة رسالة المستخدم
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // استدعاء API الشات
      const response = await fetch('/api/chatbot/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: input,
          conversationId: messages[0]?.id || 'new',
          language: 'ar'
        }),
      });

      const data = await response.json();

      // إضافة رد البوت
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: data.reply,
        timestamp: new Date(),
        confidence: data.confidence,
      };

      setMessages(prev => [...prev, botMessage]);

      // حفظ المحادثة
      await saveConversation([userMessage, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      // رد خطأ
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: 'عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.',
        timestamp: new Date(),
      }]);
    } finally {
      setLoading(false);
    }
  };

  // حفظ المحادثة
  const saveConversation = async (newMessages: Message[]) => {
    try {
      await fetch('/api/chatbot/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
    } catch (error) {
      console.error('Error saving conversation:', error);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600"
      >
        <MessageCircle size={24} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 h-96 bg-white rounded-lg shadow-2xl flex flex-col">
      {/* Header */}
      <div className="bg-blue-500 text-white p-4 rounded-t-lg flex justify-between items-center">
        <h3 className="font-bold">مساعد الخدمات</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-xl font-bold hover:bg-blue-600 rounded px-2"
        >
          ✕
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <div className="text-gray-500 text-center text-sm">
            مرحباً! كيف يمكنني مساعدتك؟
          </div>
        )}
        
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-3 py-2 rounded-lg ${
                msg.role === 'user'
                  ? 'bg-blue-500 text-white rounded-br-none'
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'
              }`}
            >
              <p className="text-sm">{msg.content}</p>
              {msg.confidence && msg.confidence < 80 && (
                <p className="text-xs mt-1 opacity-75">
                  (دقة: {Math.round(msg.confidence)}%)
                </p>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-800 rounded-lg rounded-bl-none px-3 py-2">
              <Loader size={16} className="animate-spin" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="border-t p-3 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="اكتب سؤالك..."
          className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="bg-blue-500 text-white rounded px-3 py-2 hover:bg-blue-600 disabled:opacity-50"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}
```

---

### 2. Backend Controller: chatbotController.js

```javascript
// backend/controllers/chatbotController.js

const ChatMessage = require('../models/ChatMessage');
const { analyzeQuestion, generateResponse } = require('../lib/ai-service');

// إرسال السؤال والحصول على الرد
exports.askQuestion = async (req, res) => {
  try {
    const { message, conversationId, language = 'ar' } = req.body;

    if (!message || message.trim().length === 0) {
      return res.status(400).json({ error: 'الرسالة فارغة' });
    }

    // تحليل السؤال
    const analysis = await analyzeQuestion(message, language);

    // توليد الرد
    const response = await generateResponse(analysis, language);

    // حفظ الرسالة في Database
    const chatMessage = new ChatMessage({
      conversationId: conversationId || new mongoose.Types.ObjectId(),
      messages: [
        { role: 'user', content: message, timestamp: new Date() },
        { role: 'bot', content: response.reply, timestamp: new Date(), confidence: response.confidence },
      ],
      language,
      analysis: analysis,
      userId: req.user?._id,
    });

    await chatMessage.save();

    res.json({
      success: true,
      reply: response.reply,
      confidence: response.confidence,
      conversationId: chatMessage.conversationId,
    });
  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({ 
      error: 'حدث خطأ في معالجة السؤال',
      message: error.message 
    });
  }
};

// حفظ المحادثة
exports.saveConversation = async (req, res) => {
  try {
    const { messages, conversationId } = req.body;

    const chatMessage = new ChatMessage({
      conversationId: conversationId || new mongoose.Types.ObjectId(),
      messages,
      userId: req.user?._id,
      language: 'ar',
    });

    await chatMessage.save();

    res.json({ success: true, id: chatMessage._id });
  } catch (error) {
    console.error('Error saving conversation:', error);
    res.status(500).json({ error: 'خطأ في حفظ المحادثة' });
  }
};

// الحصول على سجل المحادثات
exports.getConversations = async (req, res) => {
  try {
    const conversations = await ChatMessage.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(20);

    res.json({ success: true, conversations });
  } catch (error) {
    res.status(500).json({ error: 'خطأ في جلب المحادثات' });
  }
};

// حذف محادثة
exports.deleteConversation = async (req, res) => {
  try {
    const { conversationId } = req.params;

    await ChatMessage.deleteOne({ _id: conversationId });

    res.json({ success: true, message: 'تم حذف المحادثة' });
  } catch (error) {
    res.status(500).json({ error: 'خطأ في حذف المحادثة' });
  }
};
```

---

### 3. AI Service: ai-service.js

```javascript
// backend/lib/ai-service.js

const axios = require('axios');

// قائمة الأسئلة الشائعة والأجوبة
const FAQ = {
  ar: [
    { keywords: ['السعر', 'تكلفة', 'رسوم'], reply: 'يرجى تحديد نوع الخدمة لمعرفة السعر.' },
    { keywords: ['الوقت', 'المدة', 'كم أحتاج'], reply: 'تختلف مدة الخدمة حسب نوعها. يمكنك معرفة المدة بعد اختيار مقدم الخدمة.' },
    { keywords: ['الضمان', 'المسؤولية'], reply: 'جميع الخدمات مضمونة لمدة شهر واحد على الأقل.' },
    { keywords: ['الدفع', 'طريقة'], reply: 'نقبل الدفع عند الانتهاء من الخدمة أو عبر التطبيق.' },
    { keywords: ['إلغاء', 'استرجاع'], reply: 'يمكنك إلغاء الحجز قبل 24 ساعة بدون رسوم.' },
  ]
};

// تحليل السؤال باستخدام الكلمات المفتاحية
async function analyzeQuestion(message, language = 'ar') {
  const faqs = FAQ[language] || FAQ['ar'];
  
  // تحويل إلى أحرف صغيرة
  const lowerMessage = message.toLowerCase();
  
  for (const faq of faqs) {
    for (const keyword of faq.keywords) {
      if (lowerMessage.includes(keyword)) {
        return {
          intent: keyword,
          confidence: 85,
          type: 'faq'
        };
      }
    }
  }

  // إذا لم نجد تطابق، استخدم API الذكاء الاصطناعي
  return await analyzeWithAI(message, language);
}

// تحليل متقدم باستخدام AI
async function analyzeWithAI(message, language = 'ar') {
  try {
    // يمكنك استخدام OpenAI أو Hugging Face أو أي API آخر
    const response = await axios.post(
      'https://api.example-ai.com/analyze',
      { text: message, language },
      { headers: { 'Authorization': `Bearer ${process.env.AI_API_KEY}` } }
    );

    return response.data;
  } catch (error) {
    console.error('AI Service error:', error);
    // استرجاع للرد العام
    return { intent: 'general', confidence: 50, type: 'fallback' };
  }
}

// توليد الرد
async function generateResponse(analysis, language = 'ar') {
  const replies = {
    ar: {
      faq: 'بناءً على سؤالك:',
      general: 'هذا سؤال جيد! دعني أساعدك...',
      fallback: 'عذراً، لم أفهم السؤال بوضوح. هل يمكنك إعادة صياغته؟',
    }
  };

  const faqs = FAQ[language] || FAQ['ar'];
  
  // البحث عن الرد المناسب
  for (const faq of faqs) {
    if (faq.keywords.includes(analysis.intent)) {
      return {
        reply: faq.reply,
        confidence: analysis.confidence || 85,
      };
    }
  }

  return {
    reply: replies[language][analysis.type] || replies['ar']['fallback'],
    confidence: analysis.confidence || 50,
  };
}

module.exports = {
  analyzeQuestion,
  generateResponse,
};
```

---

### 4. Database Model: ChatMessage.js

```javascript
// backend/models/ChatMessage.js

const mongoose = require('mongoose');

const ChatMessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    messages: [
      {
        role: { type: String, enum: ['user', 'bot'], required: true },
        content: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
      },
    ],
    language: { type: String, default: 'ar', enum: ['ar', 'en'] },
    analysis: mongoose.Schema.Types.Mixed,
    sentiment: { type: String, enum: ['positive', 'neutral', 'negative'] },
    resolved: { type: Boolean, default: false },
    rating: { type: Number, min: 1, max: 5 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ChatMessage', ChatMessageSchema);
```

---

### 5. Routes: chatbot.js

```javascript
// backend/routes/chatbot.js

const express = require('express');
const router = express.Router();
const chatbotController = require('../controllers/chatbotController');
const auth = require('../middleware/auth');

// السؤال والحصول على الرد
router.post('/ask', chatbotController.askQuestion);

// حفظ المحادثة
router.post('/save', auth, chatbotController.saveConversation);

// الحصول على المحادثات
router.get('/conversations', auth, chatbotController.getConversations);

// حذف محادثة
router.delete('/conversations/:conversationId', auth, chatbotController.deleteConversation);

module.exports = router;
```

---

## 🧪 اختبار الشات

```bash
# اختبار الرد على سؤال
curl -X POST http://localhost:5000/api/chatbot/ask \
  -H "Content-Type: application/json" \
  -d '{"message": "كم سعر الخدمة؟", "language": "ar"}'

# الاستجابة المتوقعة:
{
  "success": true,
  "reply": "يرجى تحديد نوع الخدمة لمعرفة السعر.",
  "confidence": 85,
  "conversationId": "507f1f77bcf86cd799439011"
}
```

---

## 📊 المؤشرات

```
✅ Response time: < 500ms
✅ Accuracy: > 85%
✅ User satisfaction: > 4/5
✅ Fallback rate: < 15%
```

---

**الملف جاهز للتطوير! اذهب للملف التالي: FIXED_PRICING.md** 🚀

