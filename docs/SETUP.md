# Kurulum Kılavuzu

## Gereksinimler
- Node.js 18+ 
- pnpm veya npm
- PostgreSQL (Token işlemleri için)

## Kurulum Adımları

### Yerel Kurulum

1. Bağımlılıkları yükleyin:
```bash
pnpm install
```

2. Ortam değişkenlerini ayarlayın:
```bash
cp .env.example .env.local
```

3. Veritabanını hazırlayın:
```bash
pnpm prisma migrate dev
```

4. Market API anahtarlarını ayarlayın:
```bash
# .env.local dosyasına ekleyin
BINANCE_API_KEY=your_binance_api_key
BINANCE_API_SECRET=your_binance_secret
KUCOIN_API_KEY=your_kucoin_api_key
KUCOIN_API_SECRET=your_kucoin_secret
OKX_API_KEY=your_okx_api_key
OKX_API_SECRET=your_okx_secret
BYBIT_API_KEY=your_bybit_api_key
BYBIT_API_SECRET=your_bybit_secret
```

5. Geliştirme sunucusunu başlatın:
```bash
pnpm dev
```

### Docker ile Kurulum

1. Docker Compose dosyasını kullanarak tüm servisleri başlatın:
```bash
docker-compose up -d
```

Bu komut aşağıdaki servisleri başlatacaktır:
- Web uygulaması (Next.js)
- PostgreSQL veritabanı
- Supabase
- Market servisleri

2. Veritabanı migration'larını çalıştırın:
```bash
docker-compose exec web pnpm prisma migrate deploy
```

3. Uygulama şu adreste çalışıyor olacaktır:
```
http://localhost:3000
```

4. Servisleri durdurmak için:
```bash
docker-compose down
```

### Geliştirme Kontrolleri

Kurulumdan sonra aşağıdaki kontrolleri yapın:

1. Web uygulamasına erişim: http://localhost:3000
2. API endpoints çalışıyor mu: http://localhost:3000/api/health
3. WebSocket bağlantısı: ws://localhost:3000/ws
4. Veritabanı bağlantısı: PostgreSQL console veya GUI aracı ile kontrol
5. Market API'ları: Her bir market için test emirleri gönderin

## Market Entegrasyonları

Her bir market için aşağıdaki özellikleri içeren ayrı sayfalar bulunmaktadır:

### Ortak Özellikler
- Fiyat grafikleri (TradingView entegrasyonu)
- Emir defteri
- Son işlemler
- Açık emirler
- İşlem geçmişi

### Market Özel Özellikleri
- Binance: Spot ve Futures trading
- KuCoin: Trading botu entegrasyonu
- OKX: Margin trading özellikleri
- ByBit: Vadeli işlemler ve türevler

### Sayfa Yapılandırması
Her market sayfası (`/markets/[market]`) şu bileşenleri içerir:
- MarketHeader: Market bilgileri ve seçenekler
- TradingView: Gelişmiş grafik arayüzü
- OrderBook: Canlı emir defteri
- TradeHistory: Son işlemler
- OrderForm: Alım-satım formu

## Klasör Yapısı ve Sayfa Açıklamaları

### Route Yapısı

- `/` - Ana sayfa
- `/auth/login` - Kullanıcı girişi
- `/auth/register` - Yeni kullanıcı kaydı
- `/markets` - Tüm marketlerin listelendiği sayfa
- `/markets/[market]` - Her bir market için dinamik sayfa
  - Örnek: `/markets/binance`, `/markets/kucoin`
- `/token-sale` - Token alım-satım ana sayfası
- `/trade` - Trading platformu ana sayfası

### Detaylı Klasör Yapısı

```
/app
  /admin          # Admin paneli
    /dashboard    # Yönetici kontrol paneli
    /users        # Kullanıcı yönetimi
    /transactions # İşlem geçmişi
  /auth          # Kimlik doğrulama
    /login       # Giriş sayfası
    /register    # Kayıt sayfası
  /markets       # Market sayfaları
    /binance     # Binance market
    /kucoin      # KuCoin market
    /okx         # OKX market
    /bybit       # ByBit market
    /[market]    # Dinamik market sayfası
      /page.tsx  # Market detay sayfası
      /orders    # Emir sayfası
      /trades    # İşlem geçmişi
  /token-sale    # Token satış sistemi
    /buy         # Token satın alma
    /sell        # Token satış
    /history     # İşlem geçmişi
  /trade         # Trading arayüzü
    /spot        # Spot trading
    /futures     # Vadeli işlemler
    /margin      # Marjin trading
/components      
  /shared        # Paylaşılan bileşenler
  /ui            # UI bileşenleri
/lib            # Yardımcı fonksiyonlar
/prisma         # Veritabanı şemaları
```