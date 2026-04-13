# 🚀 دليل سريع - Quick Reference Guide

## 🎯 البدء السريع (5 دقائق)

```bash
# 1. الانتقال إلى مجلد Backend
cd backend

# 2. تشغيل الخادم
npm start

# 3. في terminal جديد - اختبار الاتصال
node testDB.js

# 4. في terminal آخر - اختبار APIs
node fullTestSuite.js
```

---

## 📝 بيانات الدخول

| البيان | القيمة |
|-------|--------|
| **Email** | admin@a5adamaty.com |
| **Password** | admin12345678 |
| **Server** | http://localhost:5000 |
| **Database** | MongoDB Atlas (cluster0) |

---

## 🔧 الأوامر المهمة

### التطوير
```bash
cd backend
npm start              # تشغيل الخادم
npm run dev          # مع auto-reload (nodemon)
```

### الاختبار
```bash
cd backend
node testDB.js              # اختبار DB connection
node testAPI.js             # اختبار health endpoint
node fullTestSuite.js       # اختبار شامل
node scripts/checkDatabase.js # عرض البيانات الحالية
```

### إدارة البيانات
```bash
cd backend

# إنشاء admin جديد
node scripts/createAdmin.js

# حذف كل المستخدمين ما عدا admin
node scripts/deleteNonAdminUsers.js

# تنظيف كل البيانات
node scripts/cleanDatabase.js

# إصلاح كلمة مرور admin
node scripts/fixAdminPassword.js
```

---

## 🌐 اختبار APIs مع Curl

```bash
# فحص صحة الخادم
curl http://localhost:5000/api/health

# التسجيل
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"احمد","email":"ahmed@test.com","phone":"0123456789","password":"test1234"}'

# تسجيل الدخول
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@a5adamaty.com","password":"admin12345678"}'

# الحصول على مقدمي الخدمات
curl http://localhost:5000/api/providers
```

---

## ⚙️ متغيرات البيئة (.env)

### Backend Configuration
```env
# Database
MONGODB_URI=mongodb+srv://DevDouu:Moh0100189832111%23@cluster0.d6aspiz.mongodb.net/?appName=Cluster0

# JWT
JWT_SECRET=your-secret-key-here
JWT_EXPIRE=7d

# Server
PORT=5000
NODE_ENV=development

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

### Frontend Configuration (.env.local)
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_DEFAULT_LANGUAGE=ar
VITE_DEFAULT_THEME=light
```

---

## 🐛 Troubleshooting

### الخادم لا يبدأ؟
```bash
# 1. تحقق من npm
npm -v

# 2. ثبت dependencies
npm install

# 3. افحص ملف .env
cat backend/.env | grep MONGODB_URI

# 4. اختبر الاتصال المباشر
node backend/testDB.js
```

### لا يمكن الاتصال بـ DB؟
```bash
# تحقق من firewall/network
# تأكد من IP whitelist في MongoDB Atlas
# اختبر connection string
curl mongodb://DevDouu:Moh0100189832111#@cluster0.d6aspiz.mongodb.net/test
```

### فشل الـ API call؟
```bash
# تحقق من الخادم يعمل
curl http://localhost:5000/api/health

# افحص CORS configuration
# تحقق من request headers
# افحص browser console
```

---

## 📊 المجموعات (Collections) الموجودة

```
users              - بيانات المستخدمين
bookings           - الحجوزات
serviceproviders   - مقدمو الخدمات
reviews            - التقييمات
```

---

## 🔐 بيانات الأمان

❌ **لا تفعل:**
- ❌ لا تشارك connection string
- ❌ لا تضع passwords في git
- ❌ لا تستخدم نفس JWT_SECRET بكل مكان

✅ **افعل:**
- ✅ استخدم .env files
- ✅ غير passwords قبل الإنتاج
- ✅ استخدم environment variables

---

## 📱 اختبار من Postman

1. **New Request** → POST
2. **URL:** `http://localhost:5000/api/auth/login`
3. **Body:**
```json
{
  "email": "admin@a5adamaty.com",
  "password": "admin12345678"
}
```
4. **Send** → احصل على token
5. استخدم token في requests الأخرى:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

---

## 🎓 Links مهمة

- [MongoDB Atlas Dashboard](https://www.mongodb.com/cloud/atlas)
- [Postman API Testing](https://www.postman.com/)
- [Express.js Docs](https://expressjs.com/)
- [Mongoose Docs](https://mongoosejs.com/)
- [JWT.io](https://jwt.io/)

---

## 💡 نصائح مفيدة

1. **استخدم Postman** لاختبار APIs
2. **اعمل في tmux/screen** لـ multiple terminals
3. **راقب logs** في terminal للأخطاء
4. **استخدم nodemon** للـ auto-reload أثناء التطوير
5. **احفظ tokens** من responses لـ testing

---

## ✅ Checklist قبل الإنتاج

- [ ] تم تغيير JWT_SECRET
- [ ] تم تغيير كلمة مرور Admin
- [ ] تم تحديث CORS origins
- [ ] تم اختبار جميع endpoints
- [ ] تم إضافة error handling
- [ ] تم توثيق جميع APIs
- [ ] تم إعداد monitoring
- [ ] تم backup البيانات

---

## 🚀 النشر

### على Render.com
```bash
# 1. ربط GitHub
# 2. Select branch
# 3. Build command: npm install
# 4. Start command: npm start
# 5. Add environment variables
# 6. Deploy!
```

### على Vercel
```bash
# 1. قائمة العمليات: npm run build
# 2. Output directory: dist
# 3. Setup server API: backend URL
# 4. Deploy!
```

---

**آخر تحديث:** 13 أبريل 2026  
**الحالة:** ✅ جاهز للاستخدام

