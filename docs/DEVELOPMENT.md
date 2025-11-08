# Geliştirici Dokümantasyonu

## Token Sistemi

### Token Satın Alma İşlemi
Token satın alma işlemi aşağıdaki adımları izler:

1. Kullanıcı doğrulaması
2. Bakiye kontrolü
3. Token miktarı hesaplama
4. Transfer işlemi
5. İşlem kaydı

### Admin İşlemleri

Admin panelinde aşağıdaki işlemler yapılabilir:
- Token fiyat yönetimi
- Kullanıcı işlem geçmişi görüntüleme
- Bakiye yönetimi
- Token transfer onayları

## Trading Sistemi

### WebSocket Bağlantısı
Real-time fiyat güncellemeleri için WebSocket kullanılmaktadır:

```typescript
// Örnek WebSocket kullanımı
const ws = new WebSocket('wss://api.exchange.com/stream');
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  updatePrice(data);
};
```

### Güvenlik Önlemleri
- Rate limiting
- IP kısıtlamaları
- İşlem doğrulama
- 2FA desteği