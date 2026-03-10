# 🔍 دليل حل المشاكل | Troubleshooting Guide

## 🚨 مشاكل شائعة وحلولها

---

## ❌ المشكلة 1: "Cannot connect to MongoDB"

### الأعراض:
```
error: connect ECONNREFUSED 127.0.0.1:27017
MongoError: connect EREFUSED
```

### الحل:

#### الخطوة 1: التحقق من Connection String

```bash
# تحقق من MONGODB_URI في backend/.env
# يجب أن يكون مثل:
# mongodb+srv://username:password@cluster0.mongodb.net/aakhadanaty?retryWrites=true&w=majority
```

#### الخطوة 2: التحقق من MongoDB Atlas Settings

1. اذهب إلى [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. اختر **Cluster** → **Connect**
3. اختر **Drivers**
4. انسخ Connection String (استبدل `<password>` و `<username>`)

#### الخطوة 3: السماح بـ Network Access

1. اذهب إلى **Network Access**
2. اضغط **Add IP Address**
3. اختر **Allow Access from Anywhere** (0.0.0.0/0)
4. اضغط **Confirm**

#### الخطوة 4: تحقق من Client Version

```bash
# Backend يحتاج إلى MongoDB Driver
npm install mongoose

# تحقق من package.json
cat backend/package.json | grep -i mongoose
```

#### الخطوة 5: إعادة الـ Deployment

بعد تصحيح الإعدادات:

1. اذهب إلى Vercel Dashboard
2. اختر Backend Project
3. Settings → Environment Variables
4. حدّث `MONGODB_URI` بـ الصحيح
5. Settings → Deployments → آخر Deployment
6. اضغط **Redeploy**

---

## ❌ المشكلة 2: "CORS Error"

### الأعراض:
```
Access to XMLHttpRequest at 'https://backend.vercel.app/api/auth/login' 
from origin 'https://frontend.vercel.app' has been blocked by CORS policy
```

### الحل:

#### الخطوة 1: تحقق من CORS_ALLOWED_ORIGINS

**ملف: backend/.env**

```env
# الصحيح:
CORS_ALLOWED_ORIGINS=https://aakhadanaty-app.vercel.app,http://localhost:3000,http://localhost:5173

# الخطأ:
CORS_ALLOWED_ORIGINS=*
CORS_ALLOWED_ORIGINS=localhost:3000
CORS_ALLOWED_ORIGINS=http://aakhadanaty-app.vercel.app  # ❌ بدون https
```

#### الخطوة 2: تحديث في Vercel

1. اذهب إلى Vercel Backend
2. Settings → Environment Variables
3. ابحث عن `CORS_ALLOWED_ORIGINS`
4. أضف Frontend URL:
   ```
   https://aakhadanaty-app.vercel.app
   ```
5. اضغط **Save** ثم **Redeploy**

#### الخطوة 3: تحقق من Server Code

**ملف: backend/server.js**

```javascript
// يجب أن يحتوي على:
const cors = require('cors');

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS.split(',');
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));
```

#### الخطوة 4: مسح الـ Browser Cache

```bash
# في Chrome/Edge/Firefox:
# F12 → Application → Cookies → Delete all
# أو: Ctrl+Shift+Delete → Clear browsing data
```

---

## ❌ المشكلة 3: "JWT Token Invalid"

### الأعراض:
```
error: "JsonWebTokenError: invalid token"
error: "TokenExpiredError: jwt expired"
```

### الحل:

#### الخطوة 1: فحص JWT_SECRET

```bash
# تأكد أن JWT_SECRET موجود وقوي
echo $JWT_SECRET  # Linux/Mac
echo %JWT_SECRET%  # Windows

# يجب أن يكون:
# - على الأقل 32 حرف
# - يحتوي على أحرف كبيرة وصغيرة وأرقام
```

#### الخطوة 2: تجديد JWT_SECRET

إذا كان هناك مشكلة:

1. **اذهب إلى Vercel Backend**
2. **Settings → Environment Variables**
3. **عدّل `JWT_SECRET`:**
   ```
   قيمة قديمة: your-secret-key-123
   قيمة جديدة: MySuper$ecureKey2024!@#abc123xyz789
   ```
4. **Save** → **Redeploy**

#### الخطوة 3: تحقق من Token Expiration

**ملف: backend/.env**

```env
# إذا كنت في التطوير استخدم مدة أطول
JWT_EXPIRE=7d    # 7 أيام
JWT_EXPIRE=24h   # 24 ساعة
JWT_EXPIRE=1h    # 1 ساعة
```

#### الخطوة 4: مسح Local Storage

في Frontend، مسح التوكنات القديمة:

```javascript
// في console أو script
localStorage.removeItem('token');
localStorage.removeItem('user');
sessionStorage.clear();
```

ثم سجل الدخول مرة أخرى.

---

## ❌ المشكلة 4: "API URL Not Found (404)"

### الأعراض:
```
GET https://aakhadanaty-backend.vercel.app/api/health 404 Not Found
```

### الحل:

#### الخطوة 1: تحقق من Frontend API URL

**ملف: .env**

```env
# الصحيح:
VITE_API_URL=https://aakhadanaty-backend.vercel.app/api

# الخطأ:
VITE_API_URL=https://aakhadanaty-backend.vercel.app  # ❌ بدون /api
VITE_API_URL=http://localhost:5000/api  # ❌ localhost في الإنتاج
VITE_API_URL=aakhadanaty-backend.vercel.app/api  # ❌ بدون https://
```

#### الخطوة 2: تحقق من Backend Routes

**ملف: backend/server.js**

```javascript
// يجب أن يكون:
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Health endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', database: 'connected' });
});
```

#### الخطوة 3: تحقق من Server Port

```bash
# Backend يجب أن يستمع على PORT 5000
# في Vercel يتم تحديده تلقائياً
echo $PORT  # يجب أن يكون 5000 أو متغير Vercel
```

#### الخطوة 4: اختبر URL بشكل مباشر

```bash
# في Terminal اختبر:
curl https://aakhadanaty-backend.vercel.app/api/health

# يجب أن ترى:
# {"status":"ok","database":"connected"}
```

---

## ❌ المشكلة 5: "Build Failed on Vercel"

### الأعراض:
```
Build failed: npm ERR! code ENOENT
Error: Build script failed with exit code 1
```

### الحل:

#### الخطوة 1: تحقق من package.json

```bash
# في backend/:
cat backend/package.json | grep -A 5 '"scripts"'

# يجب أن يحتوي على:
# "start": "node server.js"
# "dev": "nodemon server.js"

# في جذر (frontend):
cat package.json | grep -A 5 '"scripts"'

# يجب أن يحتوي على:
# "build": "vite build"
# "dev": "vite"
```

#### الخطوة 2: تحقق من الملفات المفقودة

```bash
# اختبر البناء محلياً:
npm install
npm run build

# إذا حدث خطأ، سيظهر الملف المفقود
```

#### الخطوة 3: Vercel Build Settings

**Backend:**
1. اذهب إلى Vercel Project
2. Settings → Build & Development Settings
3. تأكد:
   - Build Command: **(اتركها فارغة)**
   - Install Command: `npm install`
   - Output Directory: **(اتركها فارغة)**

**Frontend:**
1. اذهب إلى Vercel Project
2. Settings → Build & Development Settings
3. تأكد:
   - Build Command: `npm run build`
   - Install Command: `npm install`
   - Output Directory: `dist`

#### الخطوة 4: أعد الـ Deployment

```bash
# من Terminal
vercel --prod --force

# أو من Dashboard: Deployments → آخر واحد → Redeploy
```

---

## ❌ المشكلة 6: "Environment Variables Not Loading"

### الأعراض:
```
undefined MONGODB_URI
error: Cannot read property 'split' of undefined
```

### الحل:

#### الخطوة 1: تحقق من المتغيرات في Vercel

1. اذهب إلى Vercel Project
2. Settings → Environment Variables
3. تأكد من وجود المتغيرات:
   - [ ] MONGODB_URI
   - [ ] JWT_SECRET
   - [ ] NODE_ENV
   - [ ] CORS_ALLOWED_ORIGINS

#### الخطوة 2: أعد الـ Deployment

```bash
# بعد إضافة المتغيرات، أعد الـ Build:
# من Dashboard: اضغط على آخر Deployment
# ثم: اضغط ... → Redeploy
```

#### الخطوة 3: استخدام .env محلياً

**ملف: backend/.env**

```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db?retryWrites=true
JWT_SECRET=your-secret-key-here
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

#### الخطوة 4: استدعاء المتغيرات بشكل صحيح

```javascript
// الصحيح:
const mongoUri = process.env.MONGODB_URI;
const secret = process.env.JWT_SECRET;

// الخطأ:
const mongoUri = process.env['mongodb_uri'];  // ❌ حالة مختلفة
const secret = MONGODB_URI;  // ❌ بدون process.env
```

---

## ❌ المشكلة 7: "Frontend Shows 503 Service Unavailable"

### الأعراض:
```
Error: Failed to fetch from https://aakhadanaty-backend.vercel.app/api/...
Status: 503 Service Unavailable
```

### الحل:

#### الخطوة 1: تحقق من Backend Health

```bash
curl https://aakhadanaty-backend.vercel.app/api/health
```

إذا فشل:

#### الخطوة 2: شاهد Vercel Logs

1. اذهب إلى Vercel Dashboard
2. اختر Backend Project
3. اضغط على **Deployments** → آخر deployment
4. اضغط **View Logs**
5. ابحث عن الأخطاء (لون أحمر)

#### الخطوة 3: تحقق من MongoDB Connection

```bash
# اختبر Connection String محلياً:
cd backend
node -e "require('mongoose').connect(process.env.MONGODB_URI).then(()=>console.log('✅ OK')).catch(e=>console.log('❌',e.message))"
```

#### الخطوة 4: أعد الـ Deployment

```bash
# من Dashboard:
Deployments → ... → Redeploy
```

---

## ❌ المشكلة 8: "Vercel Function Timeout"

### الأعراض:
```
FUNCTION_INVOCATION_TIMEOUT
The function took too long to respond
```

### الحل:

#### الخطوة 1: تحقق من Database Connection

المشكلة عادة في اتصال Database البطيء:

```javascript
// Backend/vercel.json - أضف timeout أطول:
{
  "functions": {
    "api/**/*.js": {
      "maxDuration": 60
    }
  }
}
```

#### الخطوة 2: تحقق من MongoDB Atlas

1. Network Access: تأكد من 0.0.0.0/0
2. Performance: قد تكون الـ Cluster بطيئة
3. حاول إعادة الاتصال

#### الخطوة 3: استخدم Connection Pooling

**ملف: backend/server.js**

```javascript
mongoose.connect(process.env.MONGODB_URI, {
  retryWrites: true,
  w: 'majority',
  maxPoolSize: 5,  // ضع حد من الاتصالات
  minPoolSize: 2
});
```

---

## ✅ اختبارات سريعة للتشخيص

### 1. تحقق من Backend الصحة

```bash
curl -v https://aakhadanaty-backend.vercel.app/api/health

# يجب أن تحصل على:
# HTTP/2 200 OK
# {"status":"ok","database":"connected"}
```

### 2. تحقق من CORS

```bash
# Linux/Mac
curl -H "Origin: https://aakhadanaty-app.vercel.app" \
  -H "Access-Control-Request-Method: POST" \
  -v https://aakhadanaty-backend.vercel.app/api/auth/register

# Windows
$headers = @{
    "Origin" = "https://aakhadanaty-app.vercel.app"
    "Access-Control-Request-Method" = "POST"
}
Invoke-WebRequest -Uri "https://aakhadanaty-backend.vercel.app/api/auth/register" `
    -Headers $headers -Verbose
```

### 3. تحقق من Database

```bash
# انسخ أي ملف JavaScript:
node -e "
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ DB Connected'))
  .catch(e => console.log('❌', e.message))
"
```

### 4. تحقق من Environment

```bash
# في Vercel Logs
console.log('MONGODB_URI:', process.env.MONGODB_URI ? '✅ Set' : '❌ Missing');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? '✅ Set' : '❌ Missing');
console.log('NODE_ENV:', process.env.NODE_ENV);
```

---

## 📞 الدعم الإضافي

### 1. مراجعة الـ Logs

**Vercel Logs:**
```
https://vercel.com/dashboard → Project → Deployments → View Logs
```

**MongoDB Logs:**
```
https://cloud.mongodb.com → Cluster → Monitoring → Logs
```

### 2. اختبارات Online

- **HTTP Testing**: [Postman](https://postman.com)
- **DNS Testing**: [MXToolbox](https://mxtoolbox.com)
- **SSL Testing**: [SSL Labs](https://www.ssllabs.com/ssltest/)

### 3. أوامر Debugging

```bash
# عرض جميع Environment Variables
printenv | grep -i app  (Linux/Mac)
Get-ChildItem env: | Select-String app  (Windows)

# اختبر DNS
nslookup aakhadanaty-backend.vercel.app
nslookup aakhadanaty-app.vercel.app

# اختبر Network
ping aakhadanaty-backend.vercel.app
tracert aakhadanaty-backend.vercel.app  (Windows)
traceroute aakhadanaty-backend.vercel.app  (Linux/Mac)
```

---

## 🎯 Checklist نهائي للتشخيص

- [ ] Backend يرد على `/api/health`
- [ ] Database متصلة (يظهر في Logs)
- [ ] Frontend يرسل requests للـ Backend الصحيح
- [ ] CORS Headers صحيحة
- [ ] JWT Token يتم إصداره وقبوله
- [ ] أيقونات وأصوات تحمل من CDN
- [ ] لا توجد أخطاء في Console
- [ ] لا توجد أخطاء في Vercel Logs

---

**إذا استمرت المشكلة:**

1. انسخ رسالة الخطأ الكاملة
2. اذهب إلى Vercel Logs
3. ابحث عن كلمات مفتاحية مثل:
   - `error`
   - `failed`
   - `timeout`
   - `cannot`
   - `undefined`
4. ابحث في `DEPLOYMENT_GUIDE.md` عن الحل المقابل

**استمتع بـ Debugging! 🔧**
