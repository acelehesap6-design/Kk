'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  Card,
  Text,
  Title,
  Badge,
  Select,
  SelectItem,
  Grid,
  Metric,
  ProgressBar,
} from '@tremor/react'
import { ChartComponent } from '@/components/Chart'
import { getMarketsByType } from '@/lib/market-service'

type FilterCategory = 
  | 'all'
  | 'Equity' 
  | 'Fixed Income'
  | 'Commodity'
  | 'Real Estate'
  | 'Currency'
  | 'Leveraged'
  | 'Inverse'

export default function ETFPage() {
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('all')
  const [selectedCountry, setSelectedCountry] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'aum' | 'performance' | 'expense'>('aum')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [timeframe, setTimeframe] = useState('1M')

  // Market verilerini çek
  const { data: etfs } = useQuery({
    queryKey: ['markets', 'etf'],
    queryFn: () => getMarketsByType('etf'),
    refetchInterval: 10000
  })

  // Filtreleme ve sıralama
  const filteredETFs = etfs?.filter(etf => {
    if (selectedCategory !== 'all' && etf.category !== selectedCategory) return false
    if (selectedCountry !== 'all' && etf.country !== selectedCountry) return false
    return true
  }).sort((a, b) => {
    let comparison = 0
    switch (sortBy) {
      case 'aum':
        comparison = (a.aum || 0) - (b.aum || 0)
        break
      case 'performance':
        comparison = a.priceChangePercent - b.priceChangePercent
        break
      case 'expense':
        comparison = (a.expenseRatio || 0) - (b.expenseRatio || 0)
        break
    }
    return sortOrder === 'asc' ? comparison : -comparison
  })

  // Mevcut ülkeleri çıkar
  const countries = [...new Set(etfs?.map(e => e.country).filter(Boolean))]

  return (
    <main className="p-4 md:p-6 lg:p-8">
      <div className="mb-8">
        <Title>ETF Piyasası</Title>
        <Text>Borsa yatırım fonlarını takip edin ve analiz edin</Text>
      </div>

      {/* Filtreler */}
      <Card className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Text>Kategori</Text>
            <Select value={selectedCategory} onValueChange={val => setSelectedCategory(val as FilterCategory)}>
              <SelectItem value="all">Tümü</SelectItem>
              <SelectItem value="Equity">Hisse Senedi</SelectItem>
              <SelectItem value="Fixed Income">Sabit Getirili</SelectItem>
              <SelectItem value="Commodity">Emtia</SelectItem>
              <SelectItem value="Real Estate">Gayrimenkul</SelectItem>
              <SelectItem value="Currency">Döviz</SelectItem>
              <SelectItem value="Leveraged">Kaldıraçlı</SelectItem>
              <SelectItem value="Inverse">Ters</SelectItem>
            </Select>
          </div>

          <div>
            <Text>Ülke</Text>
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectItem value="all">Tümü</SelectItem>
              {countries.map(country => (
                <SelectItem key={country} value={country}>{country}</SelectItem>
              ))}
            </Select>
          </div>

          <div>
            <Text>Sıralama</Text>
            <Select value={sortBy} onValueChange={val => setSortBy(val as typeof sortBy)}>
              <SelectItem value="aum">Fon Büyüklüğü</SelectItem>
              <SelectItem value="performance">Performans</SelectItem>
              <SelectItem value="expense">Gider Oranı</SelectItem>
            </Select>
          </div>

          <div>
            <Text>Sıralama Yönü</Text>
            <Select value={sortOrder} onValueChange={val => setSortOrder(val as 'asc' | 'desc')}>
              <SelectItem value="asc">Artan</SelectItem>
              <SelectItem value="desc">Azalan</SelectItem>
            </Select>
          </div>
        </div>
      </Card>

      {/* ETF Listesi */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredETFs?.map(etf => (
          <Card key={etf.symbol} className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <Title className="text-base">{etf.name}</Title>
                <Text className="text-sm text-gray-500">{etf.symbol}</Text>
              </div>
              <Badge color={etf.priceChangePercent >= 0 ? 'green' : 'red'}>
                {etf.priceChangePercent >= 0 ? '+' : ''}{etf.priceChangePercent.toFixed(2)}%
              </Badge>
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-baseline">
                <Text>Fiyat</Text>
                <Metric>${etf.lastPrice.toFixed(2)}</Metric>
              </div>
              
              <div className="mt-2">
                <div className="flex justify-between text-sm mb-1">
                  <Text>24s Aralık</Text>
                  <Text>${etf.low24h.toFixed(2)} - ${etf.high24h.toFixed(2)}</Text>
                </div>
                <ProgressBar
                  value={((etf.lastPrice - etf.low24h) / (etf.high24h - etf.low24h)) * 100}
                  color={etf.priceChangePercent >= 0 ? 'green' : 'red'}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm mb-4">
              <div>
                <Text className="text-gray-500">Fon Büyüklüğü</Text>
                <Text className="font-medium">
                  ${(etf.aum || 0 / 1e9).toFixed(2)}B
                </Text>
              </div>
              <div>
                <Text className="text-gray-500">NAV</Text>
                <Text className="font-medium">${etf.nav?.toFixed(2) || '-'}</Text>
              </div>
              <div>
                <Text className="text-gray-500">Gider Oranı</Text>
                <Text className="font-medium">{(etf.expenseRatio || 0 * 100).toFixed(2)}%</Text>
              </div>
              <div>
                <Text className="text-gray-500">İzleme Hatası</Text>
                <Text className="font-medium">{(etf.trackingError || 0 * 100).toFixed(2)}%</Text>
              </div>
            </div>

            {/* Grafik */}
            <div className="h-40 mb-4">
              <ChartComponent 
                data={[]} // OHLCV verisi gelecek
                interval={timeframe}
                symbol={etf.symbol}
                type="area"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge>{etf.category}</Badge>
              {etf.exchange && <Badge>{etf.exchange}</Badge>}
              {etf.country && <Badge>{etf.country}</Badge>}
            </div>
          </Card>
        ))}
      </div>
    </main>
  )
}