# 🏢 AAKhadanaty - Service Booking Platform

> **دعونا نقدم منصة احترافية لحجز الخدمات**

---

## 📌 حول المشروع

**AAKhadanaty** تطبيق حجز خدمات عبر الإنترنت يربط بين العملاء ومقدمي الخدمات الموثوقين.

### المميزات الرئيسية ✨
- ✅ **نظام مستخدمين كامل** (تسجيل، دخول، البيانات الشخصية)
- ✅ **نظام حجوزات متطور** (حجز، إلغاء، تتبع)
- ✅ **تقييمات وتعليقات** (للعملاء ومقدمي الخدمات)
- ✅ **لوحة تحكم إدارية** (إدارة المستخدمين والخدمات)
- ✅ **نظام دفع جاهز** (تجهيز للدفع الإلكتروني)
- ✅ **تصميم استجابي** (هاتف + تابلت + سطح المكتب)

---

## 🛠️ المتطلبات التقنية

### Frontend
- **React** 18+ (واجهة المستخدم)
- **TypeScript** (أمان النوع)
- **Vite** (أداة البناء السريعة)
- **Tailwind CSS** (تصميم احترافي)
- **UI Components** (Shadcn/ui)

### Backend
- **Node.js** + **Express** (خادم API)
- **MongoDB** (قاعدة البيانات)
- **JWT** (المصادقة الآمنة)
- **Mongoose** (نموذج البيانات)

### Deployment
- **Vercel** (استضافة Frontend و Backend)
- **MongoDB Atlas** (قاعدة البيانات السحابية)
- **GitHub** (التحكم بالإصدارات)

---

## 📂 هيكل المشروع

```
AAKhadanaty/
├── src/                          # Frontend (React)
│   ├── components/               # المكونات
│   ├── pages/                    # الصفحات
│   ├── contexts/                 # Context API (الحالة العامة)
│   ├── lib/                      # المساعدات والأدوات
│   └── App.tsx                   # الكوomponen الرئيسي
│
├── backend/                      # Backend (Express)
│   ├── server.js                 # ملف الخادم الرئيسي
│   ├── routes/                   # مسارات API
│   ├── controllers/              # منطق المعالجة
│   ├── models/                   # نماذج البيانات
│   ├── middleware/               # Middleware
│   └── .env                      # متغيرات البيئة
│
├── public/                       # الملفات الثابتة
├── deploy/                       # إعدادات الانتشار
├── package.json                  # إعدادات Frontend
├── backend/package.json          # إعدادات Backend
└── DEPLOYMENT_GUIDE.md          # دليل النشر ✨ (هام جداً!)
```

---

## 🚀 البدء السريع (Local)

### 1. متطلبات النظام
```bash
# تحقق من النسخ المثبتة
node --version    # v18+
npm --version     # v9+
git --version     # أي نسخة
```

### 2. تثبيت الاعتماديات
```bash
# Frontend
npm install

# Backend
cd backend
npm install
cd ..
```

### 3. إعداد متغيرات البيئة

**ملف: .env**
```env
VITE_API_URL=http://localhost:5000/api
```

**ملف: backend/.env**
```env
# محلي - الاتصال بـ MongoDB محلي أو Online
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/aakhadanaty
JWT_SECRET=your-secret-key-development
PORT=5000
NODE_ENV=development
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

### 4. تشغيل المشروع

**Terminal 1 - Backend:**
```bash
cd backend
npm start
# سيشتغل على http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
npm run dev
# سيشتغل على http://localhost:5173
```

---

## 🌐 النشر على الإنترنت

**⚠️ هام:** اقرأ `DEPLOYMENT_GUIDE.md` للتفاصيل الكاملة!

### المراحل (15 دقيقة):
1. **MongoDB Atlas** → إنشاء قاعدة بيانات سحابية
2. **GitHub** → دفع الكود مع Backend و Frontend
3. **Vercel** → نشر Repositories على Vercel
4. **Environment Variables** → تعيين المتغيرات في Vercel

### النتيجة النهائية:
```
Frontend:   https://aakhadanaty-app.vercel.app
Backend:    https://aakhadanaty-backend.vercel.app
Database:   MongoDB Atlas (محمي)
```

**📘 للتفاصيل الكاملة:** اقرأ [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

---

## 📋 الملفات المساعدة

| الملف | الوصف |
|------|-------|
| **DEPLOYMENT_GUIDE.md** | دليل نشر شامل (الأكثر أهمية!) |
| **DEPLOYMENT_CHECKLIST.md** | قائمة مراجعة خطوة بخطوة |
| **QUICK_COMMANDS.md** | أوامر جاهزة للنسخ واللصق |
| **QUICK_REFERENCE.md** | ملخص سريع (ملخص ملخص) |
| **TROUBLESHOOTING.md** | حل 8 مشاكل شائعة |

---

## 🔑 المتغيرات البيئية الهامة

### Backend Environment (.env)

```env
# قاعدة البيانات (من MongoDB Atlas)
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/aakhadanaty?retryWrites=true&w=majority

# الأمان
JWT_SECRET=your-super-strong-secret-key-at-least-32-characters-abc123xyz789
JWT_EXPIRE=7d

# الخادم
PORT=5000
NODE_ENV=production

# الاتصالات المسموحة
CORS_ALLOWED_ORIGINS=https://aakhadanaty-app.vercel.app,http://localhost:3000,http://localhost:5173

# البيانات الإدارية (اختياري)
ADMIN_EMAIL=admin@aakhadanaty.com
ADMIN_PASSWORD=SecurePassword123!
```

### Frontend Environment (.env)

```env
# رابط API الخلفي
VITE_API_URL=https://aakhadanaty-backend.vercel.app/api
```

---

## 📡 مسارات API المهمة

### 🔐 المصادقة
```
POST   /api/auth/register       - تسجيل مستخدم جديد
POST   /api/auth/login          - دخول المستخدم
POST   /api/auth/logout         - خروج المستخدم
GET    /api/auth/me             - بيانات المستخدم الحالي
```

### 👤 إدارة المستخدمين
```
GET    /api/users/:id           - الحصول على بيانات المستخدم
PUT    /api/users/:id           - تحديث البيانات
DELETE /api/users/:id           - حذف الحساب
```

### 📅 الحجوزات
```
GET    /api/bookings            - قائمة حجوزاتي
POST   /api/bookings            - إنشاء حجز جديد
PUT    /api/bookings/:id        - تحديث الحجز
DELETE /api/bookings/:id        - إلغاء الحجز
```

### ⭐ التقييمات
```
POST   /api/reviews             - إضافة تقييم
GET    /api/reviews/:providerId - تقييمات مقدم الخدمة
```

### 🏪 مقدمي الخدمات
```
GET    /api/providers           - قائمة مقدمي الخدمات
GET    /api/providers/:id       - بيانات مقدم الخدمة
PUT    /api/providers/:id       - تحديث الملف الشخصي
```

### 👨‍💼 الإدارة (Admin فقط)
```
GET    /api/admin/users         - قائمة جميع المستخدمين
GET    /api/admin/bookings      - جميع الحجوزات
GET    /api/admin/stats         - إحصائيات النظام
```

---

## 🧪 اختبار الـ API

استخدم **Postman** أو **curl**:

```bash
# 1. تسجيل مستخدم
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ahmed Mohammed",
    "email": "ahmed@example.com",
    "phone": "0501234567",
    "password": "Test123!"
  }'

# 2. دخول
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "ahmed@example.com",
    "password": "Test123!"
  }'

# 3. الحصول على بيانات المستخدم (مع Token)
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🎨 الصفحات الرئيسية

| الصفحة | الرابط | المسؤولية |
|--------|--------|---------|
| الرئيسية | `/` | عرض الخدمات الموصودة |
| الخدمات | `/services` | قائمة جميع الخدمات |
| تفاصيل الخدمة | `/services/:id` | بيانات كاملة للخدمة |
| تسجيل دخول | `/login` | دخول المستخدم |
| تسجيل جديد | `/register` | إنشاء حساب جديد |
| البروفايل | `/profile` | بيانات المستخدم الشخصية |
| حجوزاتي | `/bookings` | قائمة حجوزاتي |
| لوحة التحكم | `/dashboard` | لوحة تحكم المستخدم العادي |
| لوحة الموفر | `/provider-dashboard` | لوحة مقدم الخدمة |
| لوحة الإدارة | `/admin/dashboard` | إدارة النظام |

---

## 🔒 الأمان

### تم تطبيق:
✅ **JWT Authentication** - مصادقة آمنة للطلبات  
✅ **Password Hashing** - تشفير كلمات السر بـ bcrypt  
✅ **CORS Protection** - السماح فقط بالنطاقات الموثوقة  
✅ **Input Validation** - التحقق من صحة البيانات المُدخلة  
✅ **Error Handling** - معالجة الأخطاء الآمنة  
✅ **Environment Variables** - إخفاء المعلومات الحساسة  

### لا تفعل:
❌ لا تشارك JWT Secret مع أحد  
❌ لا تضع كلمات السر في الكود  
❌ لا تستخدم HTTP في الإنتاج  
❌ لا تعرض معلومات قاعدة البيانات في الأخطاء  

---

## 📊 نموذج البيانات

### User (المستخدم)
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  phone: String,
  password: String (hashed),
  role: 'customer' | 'provider' | 'admin',
  profileImage: String (URL),
  address: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Booking (الحجز)
```javascript
{
  _id: ObjectId,
  customer: User._id,
  provider: User._id,
  service: String,
  date: Date,
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled',
  price: Number,
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Review (التقييم)
```javascript
{
  _id: ObjectId,
  from: User._id,
  to: User._id,
  booking: Booking._id,
  rating: Number (1-5),
  comment: String,
  createdAt: Date
}
```

---

## 📈 إحصائيات المشروع

- **عدد الملفات**: 100+
- **سطور الكود**: 5000+
- **مسارات API**: 30+
- **مكونات React**: 20+
- **وقت البناء**: 24 ثانية
- **حجم الثقل (Gzip)**: ~150 KB

---

## 🤝 المساهمة

نرحب بـ:
- تقارير الأخطاء (Issues)
- الاقتراحات (Pull Requests)
- التحسينات (Improvements)
- الأسئلة (Questions)

---

## 📞 الدعم

إذا واجهت مشكلة:

1. **اقرأ** `TROUBLESHOOTING.md` (حل 8 مشاكل شائعة)
2. **شاهد** Vercel Logs للأخطاء
3. **تحقق** من متغيرات البيئة
4. **اختبر** API باستخدام curl
5. **استشر** MongoDB Logs

---

## 📜 الترخيص

هذا المشروع **مفتوح المصدر** للاستخدام التعليمي والتجاري.

---

## 🙏 شكراً

شكراً لاستخدام **AAKhadanaty**!

---

## ⚡ الخطوات التالية

### للبدء محلياً:
```bash
npm install
cd backend && npm install && cd ..
npm run dev
```

### للنشر:
📖 اقرأ: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

### للمساعدة السريعة:
📄 اقرأ: [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)

---

**آخر تحديث:** 2024  
**الحالة:** ✅ جاهز للإنتاج

---

**Happy Coding! 🚀**
