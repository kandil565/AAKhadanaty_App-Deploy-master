// backend/services/chatbotService.js

const keywords = {
  // Pricing queries
  price: ['كم', 'سعر', 'تكلفة', 'سعري', 'أسعار', 'price', 'cost', 'how much', 'fee'],
  
  // Service queries
  services: ['خدمات', 'تنظيف', 'صيانة', 'إصلاح', 'services', 'cleaning', 'maintenance', 'repair'],
  
  // Booking queries
  booking: ['حجز', 'أريد', 'أطلب', 'موعد', 'book', 'appointment', 'schedule', 'order'],
  
  // Hours/Availability
  hours: ['ساعات', 'مفتوح', 'مغلق', 'عاطل', 'hours', 'open', 'closed', 'timing', 'availability'],
  
  // Location
  location: ['أين', 'موقع', 'عنوان', 'where', 'location', 'address', 'area'],
  
  // Payment
  payment: ['دفع', 'سداد', 'فاتورة', 'account', 'payment', 'invoice', 'credit'],
  
  // Account/Profile
  account: ['حسابي', 'بيانات', 'تعديل', 'account', 'profile', 'edit'],
  
  // Support
  support: ['مساعدة', 'دعم', 'شكوى', 'help', 'support', 'complaint', 'issue'],
};

const responses = {
  price: {
    ar: 'سعرنا يختلف حسب الخدمة والموقع. يمكنك طلب عرض أسعار من خلال الموقع أو الاتصال بنا مباشرة.',
    en: 'Our prices vary based on the service and location. You can request a quote through the website or contact us directly.',
  },
  services: {
    ar: 'نقدم خدمات متعددة منها التنظيف والصيانة والإصلاح. ما الخدمة التي تبحث عنها؟',
    en: 'We offer multiple services including cleaning, maintenance, and repair. What service are you looking for?',
  },
  booking: {
    ar: 'يمكنك حجز خدمة من خلال الموقع بسهولة. اختر الخدمة والموقع والتاريخ المفضل.',
    en: 'You can book a service through our website easily. Select the service, location, and preferred date.',
  },
  hours: {
    ar: 'نعمل من الساعة 9 صباحاً إلى 9 مساءً يومياً. يرجى التواصل خلال هذه الساعات.',
    en: 'We operate from 9 AM to 9 PM daily. Please contact us during these hours.',
  },
  location: {
    ar: 'نخدم عدة مناطق شاملة في المدينة. أي منطقة تبحث عن خدمة فيها؟',
    en: 'We serve several areas throughout the city. Which area are you looking for service in?',
  },
  payment: {
    ar: 'نقبل جميع وسائل الدفع الآمنة والموثوقة. يمكنك الدفع بعد إتمام الخدمة.',
    en: 'We accept all secure and reliable payment methods. You can pay after completing the service.',
  },
  account: {
    ar: 'يمكنك تعديل بيانات حسابك من صفحة الملف الشخصي. هل تحتاج مساعدة؟',
    en: 'You can edit your account information from your profile page. Do you need help?',
  },
  support: {
    ar: 'فريق الدعم لدينا جاهز للمساعدة. يرجى وصف المشكلة بالتفصيل.',
    en: 'Our support team is ready to help. Please describe the issue in detail.',
  },
  default: {
    ar: 'شكراً على سؤالك. يمكنك التواصل مع فريق الدعم للحصول على إجابة أفضل.',
    en: 'Thank you for your question. You can contact our support team for a better answer.',
  },
};

// Match keywords in user message
export function findKeywordMatch(message, language = 'ar') {
  const lowerMessage = message.toLowerCase();
  
  for (const [category, keywordList] of Object.entries(keywords)) {
    if (keywordList.some(keyword => lowerMessage.includes(keyword))) {
      return category;
    }
  }
  
  return 'default';
}

// Get bot response based on keywords
export function getChatbotResponse(userMessage, language = 'ar') {
  const category = findKeywordMatch(userMessage, language);
  const categoryResponses = responses[category] || responses.default;
  
  return {
    reply: categoryResponses[language] || categoryResponses.en,
    category,
    confidence: 85,
  };
}

// Advanced: Integration with AI API (optional)
export async function getAIResponse(userMessage, language = 'ar') {
  try {
    // Example: Using GitHub's Copilot API or any other AI service
    // This is optional - use keyword matching as fallback
    
    // For now, we'll use the keyword-based approach
    return getChatbotResponse(userMessage, language);
  } catch (err) {
    console.error('AI API error:', err);
    // Fallback to keyword matching
    return getChatbotResponse(userMessage, language);
  }
}


