# 🚀 دليل النشر الكامل | AAKhadanaty Deployment Guide

## ⚙️ المتطلبات الأساسية

1. **حساب GitHub** (مجاني) - [github.com](https://github.com)
2. **حساب Vercel** (مجاني) - [vercel.com](https://vercel.com)
3. **حساب MongoDB Atlas** (مجاني) - [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

---

## 📝 الخطوة 1: إعداد MongoDB Atlas (قاعدة البيانات)

### 1.1 إنشء حساب MongoDB Atlas

1. اذهب إلى [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. اختر "Sign Up"
3. سجل بـ Google أو بريد إلكتروني

### 1.2 إنشاء Database Cluster

1. بعد التسجيل، اضغط **"Create a Deployment"**
2. اختر **"Free"** (M0 - مجاني)
3. انتظر إنشاء الـ Cluster (5-10 دقائق)

### 1.3 إنشاء Database User

1. اذهب إلى **Database Access** من الـ Left Menu
2. اضغط **"Add New Database User"**
3. استخدم:
   - Username: `aakhadanaty`
   - Password: `YourSecurePassword123!` (احفظها)
4. اضغط **"Add User"**

### 1.4 السماح بـ Network Access

1. اذهب إلى **Network Access** من الـ Left Menu
2. اضغط **"Add IP Address"**
3. اختر **"Allow Access from Anywhere"** (0.0.0.0/0)
4. اضغط **"Confirm"**

### 1.5 الحصول على Connection String

1. اذهب إلى **Databases** وافتح الـ Cluster
2. اضغط **"Connect"**
3. اختر **"Drivers"**
4. انسخ Connection String (سيكون مثل):
   ```
   mongodb+srv://aakhadanaty:PASSWORD@cluster0.mongodb.net/aakhadanaty?retryWrites=true&w=majority
   ```

---

## 🔧 الخطوة 2: تحديث ملفات البيئة

### 2.1 تحديث Backend .env

**ملف:** `backend/.env`

```env
# MongoDB Connection (من الخطوة السابقة)
MONGODB_URI=mongodb+srv://aakhadanaty:YourPassword@cluster0.mongodb.net/aakhadanaty?retryWrites=true&w=majority

# JWT Secret (اختر كلمة سرية قوية)
JWT_SECRET=your-super-secret-key-at-least-32-characters-long-12345

# Server
PORT=5000
NODE_ENV=production

# CORS (سيتم التحديث بعد نشر Vercel)
CORS_ALLOWED_ORIGINS=https://aakhadanaty-app.vercel.app,http://localhost:3000

# Admin (اختياري)
ADMIN_EMAIL=admin@aakhadanaty.com
ADMIN_PASSWORD=AdminPassword123!
```

### 2.2 تحديث Frontend .env

**ملف:** `.env`

```env
VITE_API_URL=https://aakhadanaty-backend.vercel.app/api
```

(سيتم تحديثه برابط Vercel الفعلي بعد النشر)

---

## 📚 الخطوة 3: نشر على Vercel

### 3.1 نشر البـاكاند أولاً

#### الخطوة أ: إنشء Repository على GitHub

```bash
cd backend
git init
git add .
git commit -m "Backend initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/aakhadanaty-backend.git
git push -u origin main
```

#### الخطوة ب: نشر على Vercel

1. اذهب إلى [vercel.com](https://vercel.com)
2. سجل الدخول بـ GitHub
3. اضغط **"New Project"**
4. اختر **Repository**: `aakhadanaty-backend`
5. في **Environment Variables**، أضف:
   - `MONGODB_URI`: قيمة الاتصال من MongoDB
   - `JWT_SECRET`: كلمة السر الخاصة بك
   - `NODE_ENV`: `production`
6. اضغط **"Deploy"**
7. **احفظ URL الـ Backend**: `https://aakhadanaty-backend.vercel.app`

### 3.2 نشر الفرونتاند

#### الخطوة أ: إنشء Repository للFrontend

```bash
# في الجذر الرئيسي (ليس backend)
git init
git add .
git commit -m "Frontend initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/aakhadanaty-frontend.git
git push -u origin main
```

#### الخطوة ب: تحديث Frontend API URL

قبل النشر، حدّث `.env`:

```env
VITE_API_URL=https://aakhadanaty-backend.vercel.app/api
```

#### الخطوة ج: نشر على Vercel

1. اذهب إلى [vercel.com](https://vercel.com)
2. اضغط **"New Project"**
3. اختر **Repository**: `aakhadanaty-frontend`
4. **Build Command**: `npm run build`
5. **Output Directory**: `dist`
6. اضغط **"Deploy"**
7. احفظ URL الـ Frontend: `https://aakhadanaty-app.vercel.app`

### 3.3 تحديث CORS في Backend

بعد نشر Vercel URLs:

1. اذهب إلى Vercel Backend Project
2. Settings → Environment Variables
3. حدّث `CORS_ALLOWED_ORIGINS`:
   ```
   https://aakhadanaty-app.vercel.app,http://localhost:3000,http://localhost:5173
   ```

---

## ✅ الخطوة 4: التحقق من الاتصال

### 4.1 اختبر قاعدة البيانات

```bash
# اختبر الاتصال من Terminal
curl https://aakhadanaty-backend.vercel.app/api/health

# يجب أن تحصل على:
# {"status": "ok", "database": "connected"}
```

### 4.2 اختبر تسجيل المستخدم

استخدم **Postman** أو **Thunder Client**:

```
POST https://aakhadanaty-backend.vercel.app/api/auth/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "phone": "0501234567",
  "password": "Test123!"
}
```

### 4.3 تصفح التطبيق

افتح المتصفح: https://aakhadanaty-app.vercel.app

---

## 🔐 نصائح الأمان المهمة

### ✋ لا تكشف أبداً:
- ✗ كلمات السر في Git
- ✗ MongoDB URI في الكود
- ✗ JWT Secret في Repository

### ✅ افعل دائماً:
- ✓ استخدم `.env` للسرية
- ✓ أضف `.env` إلى `.gitignore`
- ✓ غيّر كلمات السر بعد النشر الأول
- ✓ استخدم HTTPS دائماً

---

## 🚨 استكشاف الأخطاء

### خطأ: "Cannot connect to MongoDB"

1. تحقق من MONGODB_URI
2. اذهب إلى MongoDB → Network Access
3. تأكد من IP Address 0.0.0.0/0

### خطأ: "CORS Error"

1. تحقق من `CORS_ALLOWED_ORIGINS`
2. تأكد أن URL الفرونتاند صحيح
3. أعد تحميل الصفحة والـ Cache

### خطأ: "API not responding"

1. تحقق من Backend URL في .env
2. اذهب إلى Vercel Logs لمشاهدة الأخطاء
3. تأكد من أن المتغيرات البيئية صحيحة

---

## 📊 البنية النهائية

```
Frontend (Vercel)  ←→  Backend (Vercel)  ←→  Database (MongoDB Atlas)
aakhadanaty-app.vercel.app    aakhadanaty-backend.vercel.app
```

---

## 🎉 تم!

تطبيقك الآن **قيد التشغيل بالكامل** على الإنترنت! 🚀

### الروابط المهمة:
- **Frontend**: https://aakhadanaty-app.vercel.app
- **Backend**: https://aakhadanaty-backend.vercel.app
- **Database**: MongoDB Atlas Dashboard

### للمتابعة المستقبلية:
1. كل push على GitHub يُنشّط النشر التلقائي
2. تحقق من Vercel Logs للأخطاء
3. راقب استخدام MongoDB (الـ Free plan محدود)

**مبروك! 🎊**
