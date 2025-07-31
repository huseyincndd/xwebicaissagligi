# 🚀 İSG Website Admin Paneli Geliştirme Yol Haritası

## 📋 Proje Genel Bakış

**Hedef:** İSG website için tam fonksiyonel admin paneli
**Teknoloji:** Next.js 14 + Vercel KV + NextAuth.js
**Deploy:** Vercel Hobby Plan
**Süre:** 6-8 gün

---

## 🎯 Aşama 1: Temel Altyapı (1-2 gün)

### 1.1 Vercel KV Kurulumu
- [ ] Vercel CLI kurulumu
- [ ] KV database oluşturma
- [ ] Environment variables ayarlama
- [ ] KV bağlantı testi

### 1.2 NextAuth.js Kurulumu
- [ ] NextAuth.js paket kurulumu
- [ ] Authentication konfigürasyonu
- [ ] Admin kullanıcı sistemi
- [ ] Login/logout sayfaları

### 1.3 Admin Layout ve Routing
- [ ] Admin layout component'i
- [ ] Protected routes sistemi
- [ ] Admin dashboard ana sayfa
- [ ] Navigation menüsü

### 1.4 Temel Veri Yapısı
```typescript
// KV veri yapısı
{
  "hero:slogan": "Geleceğin İş Güvenliği, Bugünün Standardı",
  "hero:subtitle": "Türkiye'nin lider OSGB'si...",
  "services:list": "[{title: 'Risk Analizi', description: '...'}]",
  "team:members": "[{name: 'Ahmet Yılmaz', role: '...'}]",
  "faq:questions": "[{question: 'OSGB nedir?', answer: '...'}]",
  "contact:info": "{email: 'info@isg.com', phone: '+90...', address: '...'}",
  "leads:2024-01": "[{name: 'Ali Veli', email: '...', status: 'new'}]",
  "messages:2024-01": "[{name: 'Mehmet', message: '...', date: '...'}]"
}
```

---

## 🎯 Aşama 2: İçerik Yönetimi (2-3 gün)

### 2.1 Hero Section Editörü
- [ ] Slogan düzenleme
- [ ] Alt başlık düzenleme
- [ ] CTA buton metinleri
- [ ] Real-time preview

### 2.2 Hizmetler Editörü
- [ ] Hizmet listesi görüntüleme
- [ ] Yeni hizmet ekleme
- [ ] Hizmet düzenleme
- [ ] Hizmet silme
- [ ] Sıralama değiştirme

### 2.3 Ekip Üyeleri Editörü
- [ ] Ekip üyesi listesi
- [ ] Yeni üye ekleme
- [ ] Üye bilgileri düzenleme
- [ ] Fotoğraf yükleme
- [ ] Üye silme

### 2.4 SSS Editörü
- [ ] Soru-cevap listesi
- [ ] Yeni soru ekleme
- [ ] Soru düzenleme
- [ ] Soru silme
- [ ] Sıralama değiştirme

### 2.5 İletişim Bilgileri Editörü
- [ ] E-posta adresi
- [ ] Telefon numarası
- [ ] Adres bilgisi
- [ ] Sosyal medya linkleri

---

## 🎯 Aşama 3: Müşteri Yönetimi (2-3 gün)

### 3.1 Teklif Talepleri Sistemi
- [ ] Gelen teklif talepleri listesi
- [ ] Talep detayları görüntüleme
- [ ] Durum güncelleme (yeni, işlemde, tamamlandı)
- [ ] Yanıtlama sistemi
- [ ] E-posta bildirimleri

### 3.2 İletişim Mesajları Sistemi
- [ ] Gelen mesajlar listesi
- [ ] Mesaj detayları
- [ ] Okundu/okunmadı durumu
- [ ] Yanıtlama sistemi
- [ ] Mesaj arşivleme

### 3.3 Dashboard İstatistikleri
- [ ] Toplam teklif talebi sayısı
- [ ] Toplam mesaj sayısı
- [ ] Aylık/haftalık grafikler
- [ ] Popüler sayfalar
- [ ] Ziyaretçi istatistikleri

---

## 🎯 Aşama 4: Entegrasyon ve Optimizasyon (1-2 gün)

### 4.1 Mevcut Formları API'ye Bağlama
- [ ] Contact form API entegrasyonu
- [ ] Teklif formu API entegrasyonu
- [ ] Form validation
- [ ] Hata yönetimi

### 4.2 Dinamik İçerik Yükleme
- [ ] Website'de KV'den veri çekme
- [ ] Real-time güncelleme
- [ ] Cache sistemi
- [ ] Fallback mekanizması

### 4.3 Güvenlik ve Performans
- [ ] Input validation
- [ ] XSS koruması
- [ ] Rate limiting
- [ ] Error handling
- [ ] Loading states

---

## 📁 Dosya Yapısı

```
src/
├── app/
│   ├── admin/
│   │   ├── layout.tsx (Admin layout)
│   │   ├── page.tsx (Dashboard)
│   │   ├── login/page.tsx (Login sayfası)
│   │   ├── content/
│   │   │   ├── hero/page.tsx
│   │   │   ├── services/page.tsx
│   │   │   ├── team/page.tsx
│   │   │   ├── faq/page.tsx
│   │   │   └── contact/page.tsx
│   │   ├── leads/
│   │   │   └── page.tsx
│   │   └── messages/
│   │       └── page.tsx
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── admin/
│   │   │   ├── content/route.ts
│   │   │   ├── leads/route.ts
│   │   │   └── messages/route.ts
│   │   └── contact/route.ts
│   └── globals.css
├── components/
│   ├── admin/
│   │   ├── AdminLayout.tsx
│   │   ├── Sidebar.tsx
│   │   ├── ContentEditor.tsx
│   │   ├── LeadManager.tsx
│   │   ├── MessageManager.tsx
│   │   ├── Dashboard.tsx
│   │   └── LoginForm.tsx
│   └── ... (mevcut componentler)
├── lib/
│   ├── auth.ts (NextAuth konfigürasyonu)
│   ├── db.ts (Vercel KV bağlantısı)
│   ├── admin.ts (Admin fonksiyonları)
│   └── utils.ts
├── types/
│   └── index.ts (TypeScript tipleri)
└── hooks/
    └── useAdmin.ts (Admin custom hook)
```

---

## 🔧 Teknik Detaylar

### Vercel KV Kurulumu
```bash
# 1. Vercel CLI kurulumu
npm i -g vercel

# 2. Proje klasöründe
vercel login

# 3. KV oluştur
vercel kv create

# 4. Environment variables otomatik eklenir
# KV_URL=...
# KV_REST_API_URL=...
# KV_REST_API_TOKEN=...
```

### NextAuth.js Konfigürasyonu
```typescript
// lib/auth.ts
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Admin kullanıcı kontrolü
        if (credentials?.username === 'admin' && credentials?.password === 'password') {
          return { id: '1', name: 'Admin', email: 'admin@isg.com' }
        }
        return null
      }
    })
  ],
  pages: {
    signIn: '/admin/login'
  }
}
```

### KV Veri Yönetimi
```typescript
// lib/db.ts
import { kv } from '@vercel/kv'

export async function getHeroContent() {
  const slogan = await kv.get('hero:slogan')
  const subtitle = await kv.get('hero:subtitle')
  return { slogan, subtitle }
}

export async function updateHeroContent(slogan: string, subtitle: string) {
  await kv.set('hero:slogan', slogan)
  await kv.set('hero:subtitle', subtitle)
}

export async function getServices() {
  const services = await kv.get('services:list')
  return services ? JSON.parse(services) : []
}

export async function updateServices(services: any[]) {
  await kv.set('services:list', JSON.stringify(services))
}
```

---

## 🎨 UI/UX Tasarım

### Admin Panel Tasarım Prensipleri
- **Minimalist ve temiz** tasarım
- **Kolay kullanım** odaklı
- **Responsive** tasarım
- **Hızlı erişim** için sidebar navigation
- **Real-time feedback** için loading states

### Renk Paleti
- **Primary:** #003366 (Navy)
- **Accent:** #4CAF50 (Green)
- **Background:** #F8F9FA (Light Gray)
- **Text:** #333333 (Dark Gray)
- **Success:** #28A745
- **Warning:** #FFC107
- **Error:** #DC3545

---

## 📊 Test Senaryoları

### Fonksiyonel Testler
- [ ] Admin giriş/çıkış
- [ ] İçerik düzenleme
- [ ] Veri kaydetme
- [ ] Form validation
- [ ] Error handling

### Performans Testleri
- [ ] Sayfa yükleme hızı
- [ ] KV işlem hızı
- [ ] Memory kullanımı
- [ ] Network requests

### Güvenlik Testleri
- [ ] Authentication
- [ ] Authorization
- [ ] Input validation
- [ ] XSS koruması

---

## 🚀 Deploy Süreci

### 1. Vercel Deploy
```bash
# Deploy
vercel --prod

# Environment variables kontrol
vercel env ls
```

### 2. KV Bağlantı Testi
```bash
# KV test
vercel kv get test-key
```

### 3. Admin Panel Testi
- [ ] Login sayfası erişimi
- [ ] Dashboard yükleme
- [ ] İçerik düzenleme
- [ ] Veri kaydetme

---

## 📈 Gelecek Geliştirmeler

### Kısa Vadeli (1-2 ay)
- [ ] E-posta bildirimleri
- [ ] Dosya yükleme sistemi
- [ ] Backup/restore sistemi
- [ ] Log sistemi

### Orta Vadeli (3-6 ay)
- [ ] Çoklu kullanıcı sistemi
- [ ] Rol tabanlı yetkilendirme
- [ ] API rate limiting
- [ ] Analytics dashboard

### Uzun Vadeli (6+ ay)
- [ ] Mobile app
- [ ] Real-time notifications
- [ ] Advanced analytics
- [ ] Multi-language support

---

## ⚠️ Risk Analizi

### Düşük Risk
- ✅ Vercel KV limit aşımı (fallback sistemi)
- ✅ Performans sorunları (cache sistemi)
- ✅ Güvenlik açıkları (input validation)

### Orta Risk
- ⚠️ Veri kaybı (backup sistemi gerekli)
- ⚠️ Kullanıcı deneyimi (test edilmeli)

### Yüksek Risk
- ❌ KV servis kesintisi (fallback gerekli)
- ❌ Deploy sorunları (rollback planı)

---

## 🎯 Başlangıç Planı

### Gün 1: Altyapı
- [ ] Vercel KV kurulumu
- [ ] NextAuth.js kurulumu
- [ ] Admin layout oluşturma

### Gün 2: Authentication
- [ ] Login sayfası
- [ ] Protected routes
- [ ] Admin dashboard

### Gün 3-4: İçerik Yönetimi
- [ ] Hero section editörü
- [ ] Hizmetler editörü
- [ ] Ekip editörü

### Gün 5-6: Müşteri Yönetimi
- [ ] Teklif talepleri
- [ ] Mesajlar
- [ ] Dashboard istatistikleri

### Gün 7: Entegrasyon
- [ ] Website entegrasyonu
- [ ] Test ve optimizasyon
- [ ] Deploy

---

## 📞 İletişim ve Destek

**Geliştirme Süreci:**
- Her gün progress update
- Sorun çıktığında anında çözüm
- Test sürecinde destek

**Deploy Sonrası:**
- 1 hafta destek
- Bug fix'ler
- Kullanım rehberi

---

**🚀 Başlamaya hazır mısınız? İlk adım olarak Vercel KV kurulumu ile başlayalım!** 