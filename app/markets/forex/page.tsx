'use client'

import { useState, useEffect, useMemo } from 'react'
import { Card, Grid, Col, Title, Text, Tab, TabList, TabGroup, Select, SelectItem, Badge, Metric } from '@tremor/react'
import { useQuery } from '@tanstack/react-query'
import { ChartComponent } from '@/components/Chart'
import { OrderBook } from '@/components/OrderBook'
import { TradeHistory } from '@/components/TradeHistory'
import { PlaceOrder } from '@/components/PlaceOrder'
import { UserWallet } from '@/components/UserWallet'
import { getForexData, getOHLCV, type MarketData } from '@/lib/market-service'
import { Icons } from '@/components/icons'

const FOREX_PAIRS = [
  { symbol: 'EUR/USD', name: 'Euro/US Dollar', baseAsset: 'EUR', quoteAsset: 'USD', flag: '🇪🇺/🇺🇸' },
  { symbol: 'GBP/USD', name: 'British Pound/US Dollar', baseAsset: 'GBP', quoteAsset: 'USD', flag: '🇬🇧/🇺🇸' },
  { symbol: 'USD/JPY', name: 'US Dollar/Japanese Yen', baseAsset: 'USD', quoteAsset: 'JPY', flag: '🇺🇸/🇯🇵' },
  { symbol: 'USD/CHF', name: 'US Dollar/Swiss Franc', baseAsset: 'USD', quoteAsset: 'CHF', flag: '🇺🇸/🇨🇭' },
  { symbol: 'AUD/USD', name: 'Australian Dollar/US Dollar', baseAsset: 'AUD', quoteAsset: 'USD', flag: '🇦🇺/🇺🇸' },
  { symbol: 'USD/CAD', name: 'US Dollar/Canadian Dollar', baseAsset: 'USD', quoteAsset: 'CAD', flag: '🇺🇸/🇨🇦' },
  { symbol: 'NZD/USD', name: 'New Zealand Dollar/US Dollar', baseAsset: 'NZD', quoteAsset: 'USD', flag: '🇳🇿/🇺🇸' },
]

export default function ForexMarket() {
  const [selectedPair, setSelectedPair] = useState(FOREX_PAIRS[0])
  const [timeframe, setTimeframe] = useState('1D')
  const [orderType, setOrderType] = useState<'limit' | 'market'>('limit')

  // Forex verilerini çek
  const { data: forexRates, isLoading } = useQuery({
    queryKey: ['forex'],
    queryFn: getForexData,
    refetchInterval: 10000
  })

  // OHLCV verilerini çek
  const { data: chartData } = useQuery({
    queryKey: ['forex-ohlcv', selectedPair.symbol, timeframe],
    queryFn: () => getOHLCV(selectedPair.symbol, timeframe),
    refetchInterval: 60000
  })

  // Seçili çiftin detaylarını bul
  const selectedPairData = useMemo(() => {
    if (!forexRates) return null
    return forexRates.find(rate => rate.symbol === selectedPair.symbol)
  }, [forexRates, selectedPair])

  return (
    <main className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Title>Forex İşlemleri</Title>
            <Text>Döviz çiftleri için profesyonel trading platformu</Text>
          </div>
          <UserWallet type="forex" />
        </div>
      </div>

      {/* Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {FOREX_PAIRS.slice(0, 4).map((pair) => {
          const data = forexRates?.find(rate => rate.symbol === pair.symbol)
          const trend = data?.priceChangePercent ?? 0
          
          return (
            <Card 
              key={pair.symbol}
              className={`cursor-pointer transition-all hover:scale-[1.02] ${
                selectedPair.symbol === pair.symbol ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedPair(pair)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <Text>{pair.flag}</Text>
                  <Text className="font-medium">{pair.symbol}</Text>
                </div>
                <Text className={trend >= 0 ? 'text-green-500' : 'text-red-500'}>
                  {trend >= 0 ? '+' : ''}{trend.toFixed(2)}%
                </Text>
              </div>
              <div className="mt-2">
                <Metric>{data?.lastPrice.toFixed(5)}</Metric>
                <Text className="text-xs text-muted-foreground">
                  Hacim: {data?.volume.toLocaleString()}
                </Text>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Trading Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sol Panel - Market Detayları */}
        <Card className="lg:col-span-1 h-fit space-y-4">
          <div className="p-4 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <Text>{selectedPair.flag}</Text>
                <Title>{selectedPair.symbol}</Title>
                <Text className="text-muted-foreground">{selectedPair.name}</Text>
              </div>
            </div>
          </div>

          <div className="px-4 space-y-2">
            <div className="flex justify-between">
              <Text>Son Fiyat</Text>
              <Text className="font-medium">{selectedPairData?.lastPrice.toFixed(5)}</Text>
            </div>
            <div className="flex justify-between">
              <Text>24s Değişim</Text>
              <Text className={selectedPairData?.priceChangePercent ?? 0 >= 0 ? 'text-green-500' : 'text-red-500'}>
                {selectedPairData?.priceChangePercent.toFixed(2)}%
              </Text>
            </div>
            <div className="flex justify-between">
              <Text>24s Yüksek</Text>
              <Text>{selectedPairData?.high24h.toFixed(5)}</Text>
            </div>
            <div className="flex justify-between">
              <Text>24s Düşük</Text>
              <Text>{selectedPairData?.low24h.toFixed(5)}</Text>
            </div>
            <div className="flex justify-between">
              <Text>24s Hacim</Text>
              <Text>{selectedPairData?.volume.toLocaleString()}</Text>
            </div>
          </div>

          <div className="p-4 border-t border-gray-800">
            <PlaceOrder 
              pair={selectedPair.symbol}
              balance={{
                base: 100000,
                quote: 100000
              }}
            />
          </div>
        </Card>

        {/* Orta Panel - Grafik */}
        <Card className="lg:col-span-2">
          <div className="p-4 border-b border-gray-800">
            <TabGroup 
              index={['1m', '5m', '15m', '1h', '1d'].indexOf(timeframe)}
              onIndexChange={(index) => setTimeframe(['1m', '5m', '15m', '1h', '1d'][index])}
            >
              <TabList>
                <Tab>1D</Tab>
                <Tab>1S</Tab>
                <Tab>15D</Tab>
                <Tab>1A</Tab>
                <Tab>4S</Tab>
              </TabList>
            </TabGroup>
          </div>
          
          <div className="p-4">
            <ChartComponent 
              data={chartData || []}
              interval={timeframe}
              symbol={selectedPair.symbol}
            />
          </div>
        </Card>

        {/* Sağ Panel - Emir Defteri ve İşlem Geçmişi */}
        <Card className="lg:col-span-1">
          <TabGroup>
            <TabList>
              <Tab>Emir Defteri</Tab>
              <Tab>Son İşlemler</Tab>
            </TabList>
            <div className="p-4">
              <OrderBook 
                pair={selectedPair.symbol}
                precision={5}
              />
              <TradeHistory pair={selectedPair.symbol} />
            </div>
          </TabGroup>
        </Card>
      </div>
    </main>
  )
}
}