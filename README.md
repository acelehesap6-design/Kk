# KK Exchange - Gelişmiş Trading Platformu

KK Exchange, kripto para, forex ve hisse senetleri için gelişmiş bir trading platformudur. Modern teknolojiler kullanılarak geliştirilmiş, kullanıcı dostu arayüzü ve güçlü özellikleri ile profesyonel trading deneyimi sunar.

## 🚀 Özellikler

- **Çoklu Market Desteği**: Binance, KuCoin, OKX, ByBit entegrasyonu
- **Gerçek Zamanlı Veriler**: WebSocket ile canlı fiyat güncellemeleri
- **Gelişmiş Grafikler**: TradingView entegrasyonu
- **KK99 Token**: Platform özel token sistemi
- **Güvenli İşlemler**: 2FA ve gelişmiş güvenlik protokolleri
- **Responsive Tasarım**: Mobil ve masaüstü uyumlu

## 🛠️ Teknolojiler

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Tremor React
- **UI Components**: Radix UI, Headless UI
- **Charts**: Lightweight Charts, TradingView
- **Database**: PostgreSQL, Prisma ORM
- **Authentication**: Supabase
- **Deployment**: GitHub Pages

## 📦 Kurulum

### Gereksinimler
- Node.js 18+
- pnpm (önerilen) veya npm
- PostgreSQL (opsiyonel, token işlemleri için)

### Hızlı Başlangıç

1. **Projeyi klonlayın:**
```bash
git clone https://github.com/acelehesap6-design/Kk.git
cd Kk
```

2. **Bağımlılıkları yükleyin:**
```bash
pnpm install
```

3. **Geliştirme sunucusunu başlatın:**
```bash
pnpm dev
```

4. **Tarayıcınızda açın:**
```
http://localhost:3000
```

### Production Build

```bash
pnpm build
```

## 📁 Proje Yapısı

```
/app
  /admin          # Admin paneli
  /auth           # Kimlik doğrulama
  /dashboard      # Kullanıcı paneli
  /token          # KK99 Token sayfası
  /trade          # Trading arayüzü
/components       # React bileşenleri
  /ui            # UI bileşenleri
/lib             # Yardımcı fonksiyonlar
/docs            # Dokümantasyon
/public          # Statik dosyalar
```

## 🌐 Canlı Demo

Platform GitHub Pages üzerinde yayınlanmaktadır:
- **Ana Site**: [https://acelehesap6-design.github.io/Kk](https://acelehesap6-design.github.io/Kk)

## 📚 Dokümantasyon

Detaylı dokümantasyon için:
- [Kurulum Kılavuzu](./docs/SETUP.md)
- [Geliştirici Dokümantasyonu](./docs/DEVELOPMENT.md)
- [API Dokümantasyonu](./docs/API.md)

## 🔧 Konfigürasyon

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
DATABASE_URL=your_database_url

# Market API Keys (opsiyonel)
BINANCE_API_KEY=your_binance_api_key
BINANCE_API_SECRET=your_binance_secret
```

## 🚀 Deployment

### GitHub Pages

Proje otomatik olarak GitHub Actions ile deploy edilir:

1. `main` branch'e push yapın
2. GitHub Actions workflow otomatik çalışır
3. Site `gh-pages` branch'ine deploy edilir

### Manuel Deployment

```bash
pnpm build
# Build dosyları ./out klasöründe oluşturulur
```

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

- **Website**: [https://acelehesap6-design.github.io/Kk](https://acelehesap6-design.github.io/Kk)
- **GitHub**: [https://github.com/acelehesap6-design/Kk](https://github.com/acelehesap6-design/Kk)

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!
