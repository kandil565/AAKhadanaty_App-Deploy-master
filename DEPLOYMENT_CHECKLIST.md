# ✅ قائمة النشر السريعة | Quick Deployment Checklist

## 📋 قبل البدء

- [ ] حساب GitHub مُنشأ
- [ ] حساب Vercel مُنشأ  
- [ ] حساب MongoDB Atlas مُنشأ

---

## 🗄️ الخطوة 1: MongoDB Atlas

- [ ] إنشاء Cluster مجاني (M0)
- [ ] انتظار الـ Cluster الجاهز (5-10 دقائق)
- [ ] إنشاء Database User
- [ ] السماح بـ Network Access (0.0.0.0/0)
- [ ] نسخ Connection String

**Connection String:**
```
mongodb+srv://aakhadanaty:PASSWORD@cluster0.mongodb.net/aakhadanaty?retryWrites=true&w=majority
```

---

## 🔐 الخطوة 2: تحديث البيئة

### Backend (.env)

```env
MONGODB_URI=<نسخ من MongoDB>
JWT_SECRET=<كلمة سرية قوية>
NODE_ENV=production
CORS_ALLOWED_ORIGINS=https://aakhadanaty-app.vercel.app,http://localhost:3000
```

- [ ] تحديث `backend/.env` بـ MongoDB URI
- [ ] تعيين `JWT_SECRET` قوي
- [ ] تعيين `NODE_ENV=production`

### Frontend (.env)

```env
VITE_API_URL=https://aakhadanaty-backend.vercel.app/api
```

- [ ] تحديث `VITE_API_URL` برابط Backend

---

## 📚 الخطوة 3: Github Repositories

### Backend Repository

```bash
cd backend
git init
git add .
git commit -m "Backend initial"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/aakhadanaty-backend.git
git push -u origin main
```

- [ ] Initialize Git في backend
- [ ] إنشء Repository على GitHub
- [ ] Push الكود

### Frontend Repository

```bash
cd ..
git init
git add .
git commit -m "Frontend initial"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/aakhadanaty-frontend.git
git push -u origin main
```

- [ ] Initialize Git في الجذر
- [ ] إنشء Repository على GitHub
- [ ] Push الكود

---

## 🚀 الخطوة 4: Vercel Deployment

### Backend على Vercel

1. [ ] اذهب إلى vercel.com
2. [ ] اضغط "New Project"
3. [ ] اختر `aakhadanaty-backend` Repository
4. [ ] أضف Environment Variables:
   - [ ] `MONGODB_URI=...`
   - [ ] `JWT_SECRET=...`
   - [ ] `NODE_ENV=production`
5. [ ] اضغط "Deploy"
6. [ ] احفظ URL: `https://aakhadanaty-backend.vercel.app`

### Frontend على Vercel

1. [ ] اضغط "New Project"
2. [ ] اختر `aakhadanaty-frontend` Repository
3. [ ] تحقق من:
   - [ ] Build Command: `npm run build`
   - [ ] Output Directory: `dist`
4. [ ] أضف Environment Variables:
   - [ ] `VITE_API_URL=https://aakhadanaty-backend.vercel.app/api`
5. [ ] اضغط "Deploy"
6. [ ] احفظ URL: `https://aakhadanaty-app.vercel.app`

---

## ✅ الخطوة 5: التحقق

### اختبر Backend

```bash
curl https://aakhadanaty-backend.vercel.app/health
```

- [ ] يجب أن تحصل على: `{"status":"ok","database":"connected"}`

### اختبر Frontend

- [ ] افتح: https://aakhadanaty-app.vercel.app
- [ ] [ ] يحمل الصفحة الرئيسية بدون أخطاء
- [ ] [ ] يمكنك التنقل بين الصفحات

### اختبر التسجيل

```bash
curl -X POST https://aakhadanaty-backend.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"Test123!"}'
```

- [ ] يتم إنشاء المستخدم بنجاح
- [ ] يمكنك تسجيل الدخول

---

## 🔄 تحديث CORS (بعد النشر)

بعد نشر كلا المشروعين:

1. [ ] اذهب إلى Vercel Backend
2. [ ] Settings → Environment Variables
3. [ ] حدّث `CORS_ALLOWED_ORIGINS`:
   ```
   https://aakhadanaty-app.vercel.app,http://localhost:3000,http://localhost:5173
   ```
4. [ ] أعد الـ deployment (يمكن من Redeploy)

---

## 📞 المتغيرات النهائية

| المتغير | القيمة | الملاحظة |
|---------|--------|---------|
| **MONGODB_URI** | `mongodb+srv://...` | من MongoDB Atlas |
| **JWT_SECRET** | `كلمة سرية قوية` | لا تشاركها |
| **NODE_ENV** | `production` | للـ Backend فقط |
| **VITE_API_URL** | `https://aakhadanaty-backend.vercel.app/api` | للـ Frontend فقط |
| **CORS_ALLOWED_ORIGINS** | `https://aakhadanaty-app.vercel.app,...` | Backends و Frontends |

---

## 🎯 النتيجة النهائية

✅ **Frontend**: https://aakhadanaty-app.vercel.app  
✅ **Backend**: https://aakhadanaty-backend.vercel.app  
✅ **Database**: MongoDB Atlas متصلة  

---

## 🚨 إذا حدث خطأ

1. تحقق من Vercel Logs: Project → Deployments → View Logs
2. تحقق من .env variables (اضغط على Project Settings)
3. تحقق من MongoDB Connection (Network Access)
4. أعد الـ Deployment (Redeploy from main)

---

**💡 التعليمات الممتدة في:** `DEPLOYMENT_GUIDE.md`

**🎉 بمجرد الانتهاء من كل الخطوات أعلاه، يكون تطبيقك جاهزاً للإنتاج!**
