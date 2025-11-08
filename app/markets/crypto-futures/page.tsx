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
  TabGroup,
  Tab,
  TabList,
} from '@tremor/react'
import { ChartComponent } from '@/components/Chart'
import { OrderBook } from '@/components/OrderBook'
import { TradeHistory } from '@/components/TradeHistory'
import { PlaceOrder } from '@/components/PlaceOrder'
import { getMarketsByType } from '@/lib/market-service'

type FilterType = 'perpetual' | 'quarterly' | 'all'
type LeverageType = '20x' | '50x' | '100x' | 'cross'

export default function CryptoFuturesPage() {
  const [selectedType, setSelectedType] = useState<FilterType>('all')
  const [selectedPair, setSelectedPair] = useState('')
  const [timeframe, setTimeframe] = useState('1H')
  const [leverage, setLeverage] = useState<LeverageType>('20x')
  const [showLongOnly, setShowLongOnly] = useState(false)
  const [showShortOnly, setShowShortOnly] = useState(false)

  // Market verilerini çek
  const { data: futures } = useQuery({
    queryKey: ['markets', 'crypto-futures'],
    queryFn: () => getMarketsByType('crypto-futures'),
    refetchInterval: 5000 // Daha sık güncelleme
  })

  // Filtreleme
  const filteredFutures = futures?.filter(future => {
    if (selectedType !== 'all' && future.category !== selectedType) return false
    return true
  })

  // Seçili kontrat
  const selectedContract = futures?.find(f => f.symbol === selectedPair)

  return (
    <main className="p-4 md:p-6 lg:p-8">
      <div className="mb-8">
        <Title>Kripto Vadeli İşlemler</Title>
        <Text>Vadeli işlem kontratlarını takip edin ve işlem yapın</Text>
      </div>

      {/* Üst Panel - Kontrat Seçimi ve Filtreler */}
      <Card className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Text>Kontrat Tipi</Text>
            <Select value={selectedType} onValueChange={val => setSelectedType(val as FilterType)}>
              <SelectItem value="all">Tümü</SelectItem>
              <SelectItem value="perpetual">Sürekli</SelectItem>
              <SelectItem value="quarterly">Üç Aylık</SelectItem>
            </Select>
          </div>

          <div>
            <Text>Kaldıraç</Text>
            <Select value={leverage} onValueChange={val => setLeverage(val as LeverageType)}>
              <SelectItem value="20x">20x</SelectItem>
              <SelectItem value="50x">50x</SelectItem>
              <SelectItem value="100x">100x</SelectItem>
              <SelectItem value="cross">Cross</SelectItem>
            </Select>
          </div>

          <div>
            <Text>Pozisyon Yönü</Text>
            <div className="flex gap-2">
              <button
                className={`px-4 py-2 rounded ${
                  showLongOnly ? 'bg-green-500 text-white' : 'bg-gray-100'
                }`}
                onClick={() => {
                  setShowLongOnly(!showLongOnly)
                  setShowShortOnly(false)
                }}
              >
                Long
              </button>
              <button
                className={`px-4 py-2 rounded ${
                  showShortOnly ? 'bg-red-500 text-white' : 'bg-gray-100'
                }`}
                onClick={() => {
                  setShowShortOnly(!showShortOnly)
                  setShowLongOnly(false)
                }}
              >
                Short
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Ana Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sol Panel - Kontrat Listesi */}
        <Card className="lg:col-span-1">
          <Title>Kontratlar</Title>
          <div className="mt-4 space-y-2">
            {filteredFutures?.map(future => (
              <div
                key={future.symbol}
                className={`p-2 rounded cursor-pointer hover:bg-gray-50 ${
                  selectedPair === future.symbol ? 'bg-gray-100' : ''
                }`}
                onClick={() => setSelectedPair(future.symbol)}
              >
                <div className="flex justify-between">
                  <Text>{future.baseAsset}</Text>
                  <Badge color={future.priceChangePercent >= 0 ? 'green' : 'red'}>
                    {future.priceChangePercent >= 0 ? '+' : ''}{future.priceChangePercent.toFixed(2)}%
                  </Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <Text className="text-gray-500">
                    {future.category === 'perpetual' ? 'PERP' : future.expiryDate}
                  </Text>
                  <Text className="font-medium">${future.lastPrice.toFixed(2)}</Text>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Orta Panel - Grafik ve İşlem Formu */}
        <Card className="lg:col-span-2">
          {selectedContract ? (
            <>
              {/* Fiyat Başlığı */}
              <div className="mb-4">
                <div className="flex justify-between items-baseline">
                  <Title>{selectedContract.name}</Title>
                  <div className="text-right">
                    <Metric>${selectedContract.lastPrice.toFixed(2)}</Metric>
                    <Text className={selectedContract.priceChangePercent >= 0 ? 'text-green-500' : 'text-red-500'}>
                      {selectedContract.priceChangePercent >= 0 ? '+' : ''}{selectedContract.priceChangePercent.toFixed(2)}%
                    </Text>
                  </div>
                </div>
                
                <div className="mt-2">
                  <Text>24s Hacim: ${selectedContract.volume.toLocaleString()}</Text>
                  <Text>Açık Pozisyon: {selectedContract.openInterest?.toLocaleString() || '0'}</Text>
                </div>
              </div>

              {/* Grafik */}
              <div className="mb-6">
                <TabGroup 
                  index={['1H', '4H', '1D', '1W'].indexOf(timeframe)}
                  onIndexChange={(index) => setTimeframe(['1H', '4H', '1D', '1W'][index])}
                >
                  <TabList>
                    <Tab>1S</Tab>
                    <Tab>4S</Tab>
                    <Tab>1G</Tab>
                    <Tab>1H</Tab>
                  </TabList>
                </TabGroup>
                
                <div className="h-80 mt-4">
                  <ChartComponent 
                    data={[]} // OHLCV verisi gelecek
                    interval={timeframe}
                    symbol={selectedContract.symbol}
                    type="candlestick"
                  />
                </div>
              </div>

              {/* İşlem Formu */}
              <PlaceOrder
                pair={selectedContract.symbol}
                leverage={leverage}
                balance={{
                  base: 1000,
                  quote: 100000
                }}
                lastPrice={selectedContract.lastPrice}
                allowMargin={true}
              />
            </>
          ) : (
            <div className="h-full flex items-center justify-center">
              <Text>Lütfen bir kontrat seçin</Text>
            </div>
          )}
        </Card>

        {/* Sağ Panel - Emir Defteri ve İşlem Geçmişi */}
        <Card className="lg:col-span-1">
          {selectedContract ? (
            <TabGroup>
              <TabList>
                <Tab>Emir Defteri</Tab>
                <Tab>Son İşlemler</Tab>
                <Tab>Pozisyonlar</Tab>
              </TabList>
              <div className="mt-4">
                <OrderBook 
                  pair={selectedContract.symbol}
                  precision={2}
                />
                
                <TradeHistory 
                  pair={selectedContract.symbol} 
                />

                <div className="space-y-2">
                  {/* Açık Pozisyonlar */}
                  <div className="p-2 border rounded">
                    <Text>Long BTC-PERP</Text>
                    <div className="flex justify-between text-sm">
                      <Text>Pozisyon: 0.5 BTC</Text>
                      <Text className="text-green-500">+2.45%</Text>
                    </div>
                  </div>
                  {/* ... */}
                </div>
              </div>
            </TabGroup>
          ) : (
            <div className="h-full flex items-center justify-center">
              <Text>Lütfen bir kontrat seçin</Text>
            </div>
          )}
        </Card>
      </div>
    </main>
  )
}