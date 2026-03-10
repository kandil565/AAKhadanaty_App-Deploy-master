# 🔧 الأوامر السريعة | Quick Commands

## 📝 قبل البدء

استبدل:
- `<GITHUB_USERNAME>` بـ أسم حسابك على GitHub
- `<MONGODB_URI>` برابط الاتصال من MongoDB Atlas
- `<JWT_SECRET>` بكلمة سرية قوية

---

## 1️⃣ تهيئة Backend

```bash
# الدخول إلى مجلد Backend
cd backend

# تهيئة Git
git init
git add .
git commit -m "Backend initial commit"
```

### تحديث environment

**ملف: backend/.env**

```bash
# Windows (PowerShell)
@'
MONGODB_URI=<MONGODB_URI>
JWT_SECRET=<JWT_SECRET>
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=production
CORS_ALLOWED_ORIGINS=https://aakhadanaty-app.vercel.app,http://localhost:3000
ADMIN_EMAIL=admin@aakhadanaty.com
ADMIN_PASSWORD=ChangeMe123!
'@ | Out-File -Encoding UTF8 .env
```

```bash
# Linux/Mac
cat > .env << EOF
MONGODB_URI=<MONGODB_URI>
JWT_SECRET=<JWT_SECRET>
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=production
CORS_ALLOWED_ORIGINS=https://aakhadanaty-app.vercel.app,http://localhost:3000
ADMIN_EMAIL=admin@aakhadanaty.com
ADMIN_PASSWORD=ChangeMe123!
EOF
```

### الربط بـ GitHub

```bash
# تعيين الفرع الرئيسي
git branch -M main

# إضافة الـ repo (استبدل اسم المستخدم)
git remote add origin https://github.com/<GITHUB_USERNAME>/aakhadanaty-backend.git

# الدفع
git push -u origin main
```

---

## 2️⃣ تهيئة Frontend

```bash
# العودة للجذر الرئيسي
cd ..

# تهيئة Git
git init
git add .
git commit -m "Frontend initial commit"
```

### تحديث environment

**ملف: .env**

```bash
# Windows (PowerShell)
@'
VITE_API_URL=https://aakhadanaty-backend.vercel.app/api
'@ | Out-File -Encoding UTF8 .env
```

```bash
# Linux/Mac
echo "VITE_API_URL=https://aakhadanaty-backend.vercel.app/api" > .env
```

### الربط بـ GitHub

```bash
# تعيين الفرع الرئيسي
git branch -M main

# إضافة الـ repo
git remote add origin https://github.com/<GITHUB_USERNAME>/aakhadanaty-frontend.git

# الدفع
git push -u origin main
```

---

## 3️⃣ اختبار محلي (Local Testing)

### تشغيل Backend

```bash
cd backend
npm install
npm start
# يجب أن يشتغل على http://localhost:5000
```

### تشغيل Frontend

```bash
# في نافذة terminal جديدة
npm install
npm run dev
# يجب أن يشتغل على http://localhost:5173
```

---

## 4️⃣ اختبار API

### اختبر الاتصال

```bash
# Windows (PowerShell)
curl http://localhost:5000/api/health

# Linux/Mac
curl http://localhost:5000/api/health
```

**النتيجة المتوقعة:**
```json
{"status":"ok","database":"connected"}
```

### تسجيل مستخدم جديد

```bash
# Windows (PowerShell)
$body = @{
    name = "John Doe"
    email = "john@example.com"
    phone = "0501234567"
    password = "Test123!"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:5000/api/auth/register" `
    -Method POST `
    -ContentType "application/json" `
    -Body $body
```

```bash
# Linux/Mac
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "0501234567",
    "password": "Test123!"
  }'
```

### تسجيل الدخول

```bash
# Windows
$body = @{
    email = "john@example.com"
    password = "Test123!"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:5000/api/auth/login" `
    -Method POST `
    -ContentType "application/json" `
    -Body $body
```

```bash
# Linux/Mac
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "Test123!"
  }'
```

---

## 5️⃣ النشر على Vercel

### خطوات يدوية:

1. **اذهب إلى**: https://vercel.com
2. **تسجيل الدخول**: بـ GitHub
3. **New Project**
4. **اختر Repository**: `aakhadanaty-backend`
5. **Environment Variables**: أضف:
   ```
   MONGODB_URI=<قيمتك>
   JWT_SECRET=<قيمتك>
   NODE_ENV=production
   ```
6. **Deploy**

ثم كرر للـ Frontend مع Repository `aakhadanaty-frontend`

### أتمتة مع Vercel CLI (اختياري)

```bash
# تثبيت Vercel CLI
npm install -g vercel

# تسجيل الدخول
vercel login

# نشر Backend
cd backend
vercel --env MONGODB_URI=<URI> --env JWT_SECRET=<SECRET>

# نشر Frontend
cd ..
vercel --env VITE_API_URL=https://aakhadanaty-backend.vercel.app/api
```

---

## 6️⃣ اختبار بعد النشر

### اختبر الـ Backend

```bash
# Windows
Invoke-WebRequest -Uri "https://aakhadanaty-backend.vercel.app/api/health"

# Linux/Mac
curl https://aakhadanaty-backend.vercel.app/api/health
```

### اختبر الـ Frontend

- افتح: https://aakhadanaty-app.vercel.app في المتصفح

### تابع الأخطاء

```bash
# شاهد الـ logs في Terminal بعد Deploy
# أو اذهب إلى Vercel Dashboard → Deployments → View Logs
```

---

## 📊 الفحوصات النهائية

```bash
# ✅ اختبر Health Endpoint
curl https://aakhadanaty-backend.vercel.app/api/health

# ✅ اختبر التسجيل
curl -X POST https://aakhadanaty-backend.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "0501234567",
    "password": "Test123!"
  }'

# ✅ اختبر تسجيل الدخول
curl -X POST https://aakhadanaty-backend.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!"
  }'

# ✅ افتح في المتصفح
# https://aakhadanaty-app.vercel.app
```

---

## 🔄 التحديثات المستقبلية

بعد أي تغيير في الكود:

```bash
# Backend
cd backend
git add .
git commit -m "Your commit message"
git push

# Frontend
cd ..
git add .
git commit -m "Your commit message"
git push

# Vercel سيقوم بـ Auto-deploy تلقائياً!
```

---

## 🚨 حل المشاكل

### لا يعمل Backend

```bash
# تحقق من Logs
https://vercel.com/dashboard → Deployments → View Logs

# تأكد من .env
echo %MONGODB_URI%  (Windows)
echo $MONGODB_URI   (Linux)

# أعد الـ deployment
https://vercel.com → Settings → Redeploy
```

### لا يعمل Frontend

```bash
# شاهد Console Errors (F12)
# تحقق من .env → VITE_API_URL
# اختبر في Network Tab هل الـ requests توصل للـ Backend
```

### Database لا تتصل

```bash
# MongoDB → Network Access → السماح من 0.0.0.0/0
# تحقق من MONGODB_URI syntax
# اختبر connetion string محلياً:
# node -e "const mongoose=require('mongoose');mongoose.connect(process.env.MONGODB_URI).then(()=>console.log('✅ Connected')).catch(e=>console.log('❌',e))"
```

---

## 📌 الملفات المهمة

| الملف | الهدف |
|------|-------|
| `backend/.env` | متغيرات البيئة للـ Backend |
| `.env` | متغيرات البيئة للـ Frontend |
| `backend/server.js` | ملف الـ Backend الرئيسي |
| `src/main.tsx` | ملف الـ Frontend الرئيسي |
| `vite.config.ts` | إعدادات Vite |
| `DEPLOYMENT_GUIDE.md` | دليل النشر المفصل |
| `DEPLOYMENT_CHECKLIST.md` | قائمة المراجعة |

---

## 🎉 نهاية النشر!

**الروابط النهائية:**
- 🌐 Frontend: https://aakhadanaty-app.vercel.app
- 🔌 Backend: https://aakhadanaty-backend.vercel.app
- 🗄️ Database: MongoDB Atlas

**استمتع بتطبيقك! 🚀**
