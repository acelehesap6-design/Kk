# API Dokümantasyonu

## Endpoints

### Kimlik Doğrulama

#### Giriş Yapma
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": string,
  "password": string
}
```

Başarılı yanıt:
```json
{
  "token": "JWT_TOKEN",
  "user": {
    "id": string,
    "email": string
  }
}
```

#### Kayıt Olma
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": string,
  "password": string,
  "name": string
}
```

### Token İşlemleri

#### Token Satın Alma
```http
POST /api/token/purchase
Content-Type: application/json
Authorization: Bearer JWT_TOKEN

{
  "amount": number,
  "paymentMethod": "crypto" | "fiat"
}
```

#### Token Satma
```http
POST /api/token/sell
Content-Type: application/json
Authorization: Bearer JWT_TOKEN

{
  "amount": number,
  "receiveMethod": "crypto" | "fiat"
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