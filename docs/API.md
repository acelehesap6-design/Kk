# API Dokümantasyonu

## Endpoints

### Token İşlemleri

#### Token Satın Alma
```http
POST /api/token/purchase
Content-Type: application/json

{
  "amount": number,
  "paymentMethod": "crypto" | "fiat"
}
```

#### Bakiye Sorgulama
```http
GET /api/user/balance
```

### Trading İşlemleri

#### Emir Oluşturma
```http
POST /api/trade/order
Content-Type: application/json

{
  "type": "buy" | "sell",
  "price": number,
  "amount": number
}
```

#### Market Verileri
```http
GET /api/market/prices
```

### WebSocket API

#### Fiyat Güncellemeleri
```javascript
// Event: price_update
{
  "symbol": string,
  "price": number,
  "timestamp": number
}
```

## Hata Kodları

- 1001: Yetersiz bakiye
- 1002: Geçersiz token miktarı
- 1003: İşlem limiti aşıldı
- 2001: Geçersiz emir
- 2002: Pazar kapalı