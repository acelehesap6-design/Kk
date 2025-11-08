import { WebSocket } from 'ws'
import { z } from 'zod'

// Market Tipleri
export type MarketType = 
  | 'crypto' 
  | 'crypto-futures'
  | 'crypto-options'
  | 'forex'
  | 'stocks'
  | 'bonds'
  | 'etf'
  | 'commodities'
  | 'indices'

// Teknik Gösterge Tipleri
export type IndicatorType = 
  | 'SMA' // Simple Moving Average
  | 'EMA' // Exponential Moving Average
  | 'RSI' // Relative Strength Index
  | 'MACD' // Moving Average Convergence Divergence
  | 'BB' // Bollinger Bands
  | 'STOCH' // Stochastic Oscillator
  | 'ATR' // Average True Range
  | 'OBV' // On Balance Volume
  | 'ADX' // Average Directional Index
  | 'VWAP' // Volume Weighted Average Price

// Zaman Aralıkları
export type TimeFrame = 
  | '1m'
  | '5m'
  | '15m'
  | '30m'
  | '1h'
  | '4h'
  | '1d'
  | '1w'
  | '1M'

// Şema Tanımlamaları
const MarketSchema = z.object({
  type: z.enum(['crypto', 'crypto-futures', 'crypto-options', 'forex', 'stocks', 'bonds', 'etf', 'commodities', 'indices']),
  symbol: z.string(),
  baseAsset: z.string().optional(),
  quoteAsset: z.string().optional(),
  name: z.string(),
  exchange: z.string().optional(),
  category: z.string(),
  country: z.string().optional(),
  unit: z.string().optional(),
  lastPrice: z.number(),
  priceChange: z.number(),
  priceChangePercent: z.number(),
  volume: z.number(),
  high24h: z.number(),
  low24h: z.number(),
  open24h: z.number(),
  marketCap: z.number().optional(),
  peRatio: z.number().optional(),
  dividendYield: z.number().optional(),
  beta: z.number().optional(),
  averageVolume: z.number().optional(),
  openInterest: z.number().optional(), // Vadeli/Opsiyon için
  strikePrice: z.number().optional(), // Opsiyon için
  expiryDate: z.string().optional(), // Vadeli/Opsiyon için
  impliedVolatility: z.number().optional(), // Opsiyon için
  delta: z.number().optional(), // Opsiyon için
  gamma: z.number().optional(), // Opsiyon için
  theta: z.number().optional(), // Opsiyon için
  vega: z.number().optional(), // Opsiyon için
  couponRate: z.number().optional(), // Tahvil için
  maturityDate: z.string().optional(), // Tahvil için
  yieldToMaturity: z.number().optional(), // Tahvil için
  duration: z.number().optional(), // Tahvil için
  rating: z.string().optional(), // Tahvil için
  trackingError: z.number().optional(), // ETF için
  expenseRatio: z.number().optional(), // ETF için
  nav: z.number().optional(), // ETF için
  aum: z.number().optional(), // ETF için
  technicalIndicators: z.array(z.object({
    name: z.enum(['SMA', 'EMA', 'RSI', 'MACD', 'BB', 'STOCH', 'ATR', 'OBV', 'ADX', 'VWAP']),
    value: z.number(),
    signal: z.enum(['buy', 'sell', 'neutral']),
    meta: z.record(z.string(), z.any()).optional()
  })).optional()
})

export type Market = z.infer<typeof MarketSchema>

// WebSocket Mesaj Şeması
const WSMessageSchema = z.object({
  type: z.enum(['trade', 'ticker', 'orderbook', 'kline']),
  symbol: z.string(),
  data: z.any()
})

export type WSMessage = z.infer<typeof WSMessageSchema>

// Market Çiftleri
export const MARKET_PAIRS: Record<MarketType, Array<{
  symbol: string
  name: string
  baseAsset?: string
  quoteAsset?: string
  category: string
  exchange?: string
  country?: string
  unit?: string
}>> = {
  // Kripto Spot
  'crypto': [
    { symbol: 'BTC-USD', name: 'Bitcoin', baseAsset: 'BTC', quoteAsset: 'USD', category: 'Major', exchange: 'Binance' },
    { symbol: 'ETH-USD', name: 'Ethereum', baseAsset: 'ETH', quoteAsset: 'USD', category: 'Major', exchange: 'Binance' },
    // ...diğer kripto çiftleri
  ],
  
  // Kripto Vadeli
  'crypto-futures': [
    { symbol: 'BTC-PERP', name: 'Bitcoin Perpetual', baseAsset: 'BTC', quoteAsset: 'USD', category: 'Perpetual', exchange: 'Binance' },
    { symbol: 'ETH-PERP', name: 'Ethereum Perpetual', baseAsset: 'ETH', quoteAsset: 'USD', category: 'Perpetual', exchange: 'Binance' },
    // ...diğer vadeli çiftler
  ],

  // Kripto Opsiyon
  'crypto-options': [
    { symbol: 'BTC-25NOV25-45000-C', name: 'BTC Call 45000', baseAsset: 'BTC', category: 'Call', exchange: 'Deribit' },
    { symbol: 'ETH-25NOV25-3000-P', name: 'ETH Put 3000', baseAsset: 'ETH', category: 'Put', exchange: 'Deribit' },
    // ...diğer opsiyon çiftleri
  ],

  // Forex
  'forex': [
    { symbol: 'EUR-USD', name: 'Euro/USD', baseAsset: 'EUR', quoteAsset: 'USD', category: 'Major' },
    { symbol: 'GBP-USD', name: 'Pound/USD', baseAsset: 'GBP', quoteAsset: 'USD', category: 'Major' },
    // ...diğer forex çiftleri
  ],

  // Hisse Senetleri
  'stocks': [
    { symbol: 'AAPL', name: 'Apple Inc.', category: 'Technology', exchange: 'NASDAQ', country: 'US', unit: 'USD' },
    { symbol: 'MSFT', name: 'Microsoft Corp.', category: 'Technology', exchange: 'NASDAQ', country: 'US', unit: 'USD' },
    // ...diğer hisseler
  ],

  // Tahvil ve Bonolar
  'bonds': [
    { symbol: 'US10Y', name: '10 Year Treasury', category: 'Government', country: 'US', unit: '%' },
    { symbol: 'US30Y', name: '30 Year Treasury', category: 'Government', country: 'US', unit: '%' },
    { symbol: 'TURKEY5Y', name: '5 Year Turkey Bond', category: 'Government', country: 'TR', unit: '%' },
    { symbol: 'CORP-AAA', name: 'AAA Corporate Index', category: 'Corporate', unit: '%' },
    // ...diğer tahviller
  ],

  // ETF'ler
  'etf': [
    { symbol: 'SPY', name: 'SPDR S&P 500 ETF', category: 'Equity', exchange: 'NYSE', country: 'US', unit: 'USD' },
    { symbol: 'QQQ', name: 'Invesco QQQ Trust', category: 'Technology', exchange: 'NASDAQ', country: 'US', unit: 'USD' },
    { symbol: 'GLD', name: 'SPDR Gold Shares', category: 'Commodity', exchange: 'NYSE', country: 'US', unit: 'USD' },
    { symbol: 'TLT', name: 'iShares 20+ Year Treasury', category: 'Bond', exchange: 'NASDAQ', country: 'US', unit: 'USD' },
    // ...diğer ETF'ler
  ],

  // Emtia
  'commodities': [
    { symbol: 'GOLD', name: 'Gold', category: 'Precious Metals', unit: 'USD/oz' },
    { symbol: 'SILVER', name: 'Silver', category: 'Precious Metals', unit: 'USD/oz' },
    // ...diğer emtialar
  ],

  // Endeksler  
  'indices': [
    { symbol: 'SPX', name: 'S&P 500', category: 'US', unit: 'USD' },
    { symbol: 'NDX', name: 'Nasdaq 100', category: 'US', unit: 'USD' },
    // ...diğer endeksler
  ]
}

// WebSocket Bağlantı Yöneticisi
class WSManager {
  private ws: WebSocket | null = null
  private reconnectTimer: NodeJS.Timeout | null = null
  private messageHandlers: ((msg: WSMessage) => void)[] = []

  constructor(private url: string) {}

  connect() {
    if (this.ws) return

    this.ws = new WebSocket(this.url)
    
    this.ws.on('open', () => {
      console.log('WebSocket connected')
      if (this.reconnectTimer) {
        clearTimeout(this.reconnectTimer)
        this.reconnectTimer = null
      }
    })

    this.ws.on('message', (data: string) => {
      try {
        const msg = WSMessageSchema.parse(JSON.parse(data))
        this.messageHandlers.forEach(handler => handler(msg))
      } catch (err) {
        console.error('Invalid message format:', err)
      }
    })

    this.ws.on('close', () => {
      console.log('WebSocket disconnected')
      this.ws = null
      this.reconnect()
    })

    this.ws.on('error', (err) => {
      console.error('WebSocket error:', err)
      this.ws?.close()
    })
  }

  private reconnect() {
    if (this.reconnectTimer) return
    
    this.reconnectTimer = setTimeout(() => {
      console.log('Attempting to reconnect...')
      this.connect()
    }, Number(process.env.MARKET_WEBSOCKET_RECONNECT_INTERVAL) || 5000)
  }

  subscribe(symbols: string[]) {
    if (!this.ws) return
    
    this.ws.send(JSON.stringify({
      type: 'subscribe',
      symbols
    }))
  }

  onMessage(handler: (msg: WSMessage) => void) {
    this.messageHandlers.push(handler)
  }

  close() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer)
      this.reconnectTimer = null
    }
    this.ws?.close()
  }
}

// Market Veri Yöneticisi
export class MarketDataManager {
  private wsManager: WSManager
  private marketData: Map<string, Market> = new Map()
  private updateCallbacks: ((markets: Market[]) => void)[] = []

  constructor() {
    this.wsManager = new WSManager(process.env.MARKET_WEBSOCKET_URL || 'ws://localhost:8080')
    
    this.wsManager.onMessage((msg) => {
      switch (msg.type) {
        case 'ticker':
          this.updateMarketData(msg.symbol, msg.data)
          break
        // Diğer mesaj tipleri
      }
    })
  }

  private updateMarketData(symbol: string, data: any) {
    const existing = this.marketData.get(symbol)
    if (existing) {
      this.marketData.set(symbol, { ...existing, ...data })
      this.notifyUpdateCallbacks()
    }
  }

  private notifyUpdateCallbacks() {
    const markets = Array.from(this.marketData.values())
    this.updateCallbacks.forEach(cb => cb(markets))
  }

  async connect() {
    this.wsManager.connect()
    // İlk market verilerini çek
    await this.fetchInitialData()
  }

  private async fetchInitialData() {
    try {
      // Her market tipi için API'lerden veri çek
      for (const [type, pairs] of Object.entries(MARKET_PAIRS)) {
        const symbols = pairs.map(p => p.symbol)
        const data = await this.fetchMarketData(type as MarketType, symbols)
        
        data.forEach(market => {
          this.marketData.set(market.symbol, market)
        })
      }

      this.notifyUpdateCallbacks()
      
      // WebSocket subscription
      const allSymbols = Array.from(this.marketData.keys())
      this.wsManager.subscribe(allSymbols)

    } catch (err) {
      console.error('Error fetching initial market data:', err)
    }
  }

  private async fetchMarketData(type: MarketType, symbols: string[]): Promise<Market[]> {
    // Her market tipi için uygun API'yi kullan
    switch(type) {
      case 'crypto':
      case 'crypto-futures':
      case 'crypto-options':
        return this.fetchCryptoData(type, symbols)
      
      case 'forex':
        return this.fetchForexData(symbols)
      
      case 'stocks':
        return this.fetchStockData(symbols)
      
      case 'bonds':
        return this.fetchBondData(symbols)
      
      case 'etf':
        return this.fetchETFData(symbols)
      
      case 'commodities':
        return this.fetchCommodityData(symbols)
      
      case 'indices':
        return this.fetchIndexData(symbols)
      
      default:
        throw new Error(`Unsupported market type: ${type}`)
    }
  }

  // Her market tipi için özel veri çekme fonksiyonları
  private async fetchCryptoData(type: MarketType, symbols: string[]): Promise<Market[]> {
    // Binance/Deribit API entegrasyonu
    return []
  }

  private async fetchForexData(symbols: string[]): Promise<Market[]> {
    // Alpha Vantage/FXCM API entegrasyonu
    return []
  }

  private async fetchStockData(symbols: string[]): Promise<Market[]> {
    // Polygon/Finnhub API entegrasyonu
    return []
  }

  private async fetchBondData(symbols: string[]): Promise<Market[]> {
    // Bloomberg/Reuters API entegrasyonu
    return []
  }

  private async fetchETFData(symbols: string[]): Promise<Market[]> {
    // IEX/Polygon API entegrasyonu
    return []
  }

  private async fetchCommodityData(symbols: string[]): Promise<Market[]> {
    // CME/ICE API entegrasyonu
    return []
  }

  private async fetchIndexData(symbols: string[]): Promise<Market[]> {
    // S&P/MSCI API entegrasyonu
    return []
  }

  onUpdate(callback: (markets: Market[]) => void) {
    this.updateCallbacks.push(callback)
  }

  getMarket(symbol: string): Market | undefined {
    return this.marketData.get(symbol)
  }

  getAllMarkets(): Market[] {
    return Array.from(this.marketData.values())
  }

  getMarketsByType(type: MarketType): Market[] {
    return this.getAllMarkets().filter(m => m.type === type)
  }

  async getOHLCV(symbol: string, timeframe: TimeFrame): Promise<any[]> {
    // İlgili API'den OHLCV verilerini çek
    return []
  }
}

// Market servis instance'ı
const marketService = new MarketDataManager()

export default marketService

// Yardımcı fonksiyonlar
export const getAllMarketData = async () => {
  return marketService.getAllMarkets()
}

export const getMarketData = (symbol: string) => {
  return marketService.getMarket(symbol)
}

export const getMarketsByType = (type: MarketType) => {
  return marketService.getMarketsByType(type)
}

export const getOHLCV = async (symbol: string, timeframe: TimeFrame) => {
  return marketService.getOHLCV(symbol, timeframe)
}