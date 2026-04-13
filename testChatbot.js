import { getChatbotResponse, findKeywordMatch } from './backend/services/chatbotService.js';

console.log('=== Testing Chatbot Service ===\n');

// Test cases
const tests = [
  { message: 'What is the price?', language: 'en', expected: 'price' },
  { message: 'كم السعر؟', language: 'ar', expected: 'price' },
  { message: 'أسعار الخدمات', language: 'ar', expected: 'price' },
  { message: 'سعري', language: 'ar', expected: 'price' },
  { message: 'How to book?', language: 'en', expected: 'booking' },
  { message: 'أريد حجز خدمة', language: 'ar', expected: 'booking' },
  { message: 'Hello', language: 'ar', expected: 'default' },
];

tests.forEach(test => {
  const category = findKeywordMatch(test.message, test.language);
  const response = getChatbotResponse(test.message, test.language);
  
  const pass = category === test.expected ? '✅' : '❌';
  console.log(`${pass} "${test.message}"`);
  console.log(`   Expected: ${test.expected}, Got: ${category}`);
  console.log(`   Reply: ${response.reply}\n`);
});
