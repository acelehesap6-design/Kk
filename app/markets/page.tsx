'use client'

import { useState, useEffect, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Card, Text, Title, TabGroup, Tab, TabList, Badge, Metric, Grid, Flex, Button, Select, SelectItem } from '@tremor/react'
import { ChartComponent } from '@/components/Chart'
import { OrderBook } from '@/components/OrderBook'
import { TradeHistory } from '@/components/TradeHistory'
import { UserWallet } from '@/components/UserWallet'
import { PlaceOrder } from '@/components/PlaceOrder'
import { MarketData, MarketType, MARKET_PAIRS, getAllMarketData, getOHLCV } from '@/lib/market-service'

// Market tiplerine göre ikonlar ve kategoriler
const MARKET_TYPES: { type: MarketType; name: string; icon: string }[] = [
  { type: 'crypto', name: 'Kripto', icon: '₿' },
  { type: 'forex', name: 'Forex', icon: '💱' },
  { type: 'stocks', name: 'Hisse', icon: '📈' },
  { type: 'indices', name: 'Endeks', icon: '📊' },
  { type: 'commodities', name: 'Emtia', icon: '🪙' },
  { type: 'bonds', name: 'Tahvil', icon: '📜' },
  { type: 'etf', name: 'ETF', icon: '🔄' }
]

export default function Markets() {
  // State yönetimi
  const [activeMarket, setActiveMarket] = useState<MarketType>('crypto')
  const [selectedPair, setSelectedPair] = useState(MARKET_PAIRS[activeMarket][0])
  const [timeframe, setTimeframe] = useState('1D')
  const [favorites, setFavorites] = useState<string[]>(
    typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('favorites') || '[]') : []
  )
  const [alerts, setAlerts] = useState<MarketAlert[]>(
    typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('alerts') || '[]') : []
  )
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'change'>('change')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  // Market verilerini çek
  const { data: marketData, isLoading } = useQuery({
    queryKey: ['markets'],
    queryFn: getAllMarketData,
    refetchInterval: 10000
  })

  // OHLCV verilerini çek
  const { data: chartData } = useQuery({
    queryKey: ['market-ohlcv', selectedPair.symbol, timeframe],
    queryFn: () => getOHLCV(selectedPair.symbol, timeframe),
    refetchInterval: 60000
  })

  // Favori ve alarm yönetimi
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    localStorage.setItem('alerts', JSON.stringify(alerts))
  }, [alerts])

  // Favori işlemleri
  const toggleFavorite = (symbol: string) => {
    setFavorites(prev => 
      prev.includes(symbol) 
        ? prev.filter(s => s !== symbol)
        : [...prev, symbol]
    )
  }

  // Alarm işlemleri
  const addAlert = (alert: Omit<MarketAlert, 'id' | 'triggered' | 'createdAt'>) => {
    const newAlert: MarketAlert = {
      ...alert,
      id: Math.random().toString(36).substring(7),
      triggered: false,
      createdAt: Date.now()
    }
    setAlerts(prev => [...prev, newAlert])
  }

  const removeAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id))
  }

  // Aktif marketteki varlıkları filtrele ve sırala
  const filteredMarketData = useMemo(() => {
    let data = marketData?.filter(market => market.type === activeMarket) || []

    if (showFavoritesOnly) {
      data = data.filter(market => favorites.includes(market.symbol))
    }

    if (selectedCategory !== 'all') {
      data = data.filter(market => market.category === selectedCategory)
    }

    return data.sort((a, b) => {
      let comparison = 0
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name)
          break
        case 'price':
          comparison = a.lastPrice - b.lastPrice
          break
        case 'change':
          comparison = a.priceChangePercent - b.priceChangePercent
          break
      }
      return sortOrder === 'asc' ? comparison : -comparison
    })
  }, [marketData, activeMarket, showFavoritesOnly, selectedCategory, sortBy, sortOrder])

  // Seçili varlığın verilerini bul
  const selectedPairData = filteredMarketData.find(market => market.symbol === selectedPair.symbol)

  // Aktif markete göre kategorileri al
  const categories = useMemo(() => {
    const categorySet = new Set(filteredMarketData.map(market => market.category))
    return ['all', ...Array.from(categorySet)]
  }, [filteredMarketData])

  // Portföy analizi için özet veriler
  const portfolioStats = useMemo(() => {
    if (!marketData) return null

    const favoriteAssets = marketData.filter(market => favorites.includes(market.symbol))
    const totalValue = favoriteAssets.reduce((sum, asset) => sum + asset.lastPrice, 0)
    const dailyChange = favoriteAssets.reduce((sum, asset) => sum + asset.priceChange, 0)
    const percentChange = (dailyChange / totalValue) * 100

    return { totalValue, dailyChange, percentChange }
  }, [marketData, favorites])

  return (
    <main className="p-4 md:p-6 lg:p-8">
      {/* Header ve Kontrol Paneli */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <Title>Finansal Piyasalar</Title>
            <Text>Tüm finansal piyasaları tek platformda takip edin ve işlem yapın</Text>
          </div>
          <UserWallet type={activeMarket} />
        </div>

        {/* Portföy Özeti */}
        {portfolioStats && (
          <Card className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Text>Toplam Portföy Değeri</Text>
                <Metric>${portfolioStats.totalValue.toFixed(2)}</Metric>
              </div>
              <div>
                <Text>Günlük Değişim</Text>
                <Metric className={portfolioStats.dailyChange >= 0 ? 'text-green-500' : 'text-red-500'}>
                  ${portfolioStats.dailyChange.toFixed(2)}
                </Metric>
              </div>
              <div>
                <Text>Yüzdesel Değişim</Text>
                <Metric className={portfolioStats.percentChange >= 0 ? 'text-green-500' : 'text-red-500'}>
                  {portfolioStats.percentChange.toFixed(2)}%
                </Metric>
              </div>
            </div>
          </Card>
        )}

        {/* Kontrol Paneli */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <Text>Piyasa Türü</Text>
            <TabGroup 
              index={MARKET_TYPES.findIndex(m => m.type === activeMarket)}
              onIndexChange={(index) => {
                const newMarket = MARKET_TYPES[index].type
                setActiveMarket(newMarket)
                setSelectedPair(MARKET_PAIRS[newMarket][0])
                setSelectedCategory('all')
              }}
            >
              <TabList>
                {MARKET_TYPES.map(market => (
                  <Tab key={market.type}>
                    {market.icon} {market.name}
                  </Tab>
                ))}
              </TabList>
            </TabGroup>
          </div>

          <div>
            <Text>Kategori</Text>
            <Select 
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category === 'all' ? 'Tümü' : category}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div>
            <Text>Sıralama</Text>
            <div className="flex gap-2">
              <Select 
                value={sortBy}
                onValueChange={(value) => setSortBy(value as typeof sortBy)}
              >
                <SelectItem value="name">İsim</SelectItem>
                <SelectItem value="price">Fiyat</SelectItem>
                <SelectItem value="change">Değişim</SelectItem>
              </Select>
              <Button
                variant="secondary"
                onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </Button>
            </div>
          </div>

          <div>
            <Text>Filtreler</Text>
            <div className="flex gap-2">
              <Button
                variant={showFavoritesOnly ? 'primary' : 'secondary'}
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              >
                ⭐ Favoriler
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowFavoritesOnly(false)
                  setSelectedCategory('all')
                  setSortBy('change')
                  setSortOrder('desc')
                }}
              >
                🔄 Sıfırla
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Market Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
        {filteredMarketData.map((market) => {
          const isFavorite = favorites.includes(market.symbol)
          const hasAlerts = alerts.some(alert => alert.symbol === market.symbol)
          
          return (
            <Card 
              key={market.symbol}
              className={`cursor-pointer transition-all hover:scale-[1.02] ${
                selectedPair.symbol === market.symbol ? 'ring-2 ring-primary' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <Text className="font-medium">{market.name}</Text>
                    <div className="flex gap-1">
                      <Button
                        size="xs"
                        variant="light"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(market.symbol)
                        }}
                      >
                        {isFavorite ? '⭐' : '☆'}
                      </Button>
                      <Button
                        size="xs"
                        variant="light"
                        onClick={(e) => {
                          e.stopPropagation()
                          if (hasAlerts) {
                            removeAlert(market.symbol)
                          } else {
                            addAlert({
                              symbol: market.symbol,
                              condition: 'above',
                              value: market.lastPrice * 1.05
                            })
                          }
                        }}
                      >
                        {hasAlerts ? '🔔' : '🔕'}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-1">
                    <Badge>{market.category}</Badge>
                    {market.exchange && <Badge>{market.exchange}</Badge>}
                    {market.unit && <Badge>{market.unit}</Badge>}
                  </div>

                  {market.technicalIndicators && (
                    <div className="mt-2 flex gap-2">
                      {market.technicalIndicators.slice(0, 3).map(indicator => (
                        <Badge 
                          key={indicator.name}
                          color={
                            indicator.signal === 'buy' ? 'green' :
                            indicator.signal === 'sell' ? 'red' : 
                            'gray'
                          }
                        >
                          {indicator.name}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-2">
                <div className="flex items-baseline justify-between">
                  <Metric>
                    {market.lastPrice.toFixed(2)}
                    {market.baseAsset && ` ${market.baseAsset}/${market.quoteAsset}`}
                  </Metric>
                  <Text className={market.priceChangePercent >= 0 ? 'text-green-500' : 'text-red-500'}>
                    {market.priceChangePercent >= 0 ? '+' : ''}{market.priceChangePercent.toFixed(2)}%
                  </Text>
                </div>
                
                <div className="flex justify-between mt-1">
                  <Text className="text-xs text-muted-foreground">
                    Hacim: {market.volume.toLocaleString()}
                  </Text>
                  {market.marketCap && (
                    <Text className="text-xs text-muted-foreground">
                      Piyasa Değeri: ${(market.marketCap / 1e9).toFixed(2)}B
                    </Text>
                  )}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <Button
                  variant="light"
                  onClick={() => setSelectedPair(MARKET_PAIRS[activeMarket].find(p => p.symbol === market.symbol)!)}
                >
                  📊 Grafik
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    setSelectedPair(MARKET_PAIRS[activeMarket].find(p => p.symbol === market.symbol)!)
                    document.getElementById('trade-form')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  💰 İşlem
                </Button>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Trading Arayüzü */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sol Panel - Market Detayları */}
        <Card className="lg:col-span-1 h-fit space-y-4">
          <div className="p-4 border-b border-gray-800">
            <div>
              <div className="flex items-center justify-between">
                <Title>{selectedPair.name}</Title>
                <div className="flex gap-1">
                  <Button
                    size="xs"
                    variant="light"
                    onClick={() => toggleFavorite(selectedPair.symbol)}
                  >
                    {favorites.includes(selectedPair.symbol) ? '⭐' : '☆'}
                  </Button>
                  <Button
                    size="xs"
                    variant="light"
                    onClick={() => {
                      const hasAlert = alerts.some(a => a.symbol === selectedPair.symbol)
                      if (hasAlert) {
                        removeAlert(selectedPair.symbol)
                      } else {
                        addAlert({
                          symbol: selectedPair.symbol,
                          condition: 'above',
                          value: selectedPairData?.lastPrice! * 1.05
                        })
                      }
                    }}
                  >
                    {alerts.some(a => a.symbol === selectedPair.symbol) ? '🔔' : '🔕'}
                  </Button>
                </div>
              </div>
              
              <Text className="text-muted-foreground">
                {selectedPair.baseAsset && `${selectedPair.baseAsset}/${selectedPair.quoteAsset}`}
                {selectedPair.unit && ` (${selectedPair.unit})`}
              </Text>
              
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge>{selectedPair.category}</Badge>
                {selectedPair.exchange && <Badge>{selectedPair.exchange}</Badge>}
                {selectedPair.country && <Badge>{selectedPair.country}</Badge>}
              </div>
            </div>
          </div>

          <div className="px-4 space-y-2">
            <div className="flex justify-between">
              <Text>Son Fiyat</Text>
              <Text className="font-medium">
                {selectedPairData?.lastPrice.toFixed(2)}
                {selectedPair.unit && ` ${selectedPair.unit}`}
              </Text>
            </div>
            <div className="flex justify-between">
              <Text>24s Değişim</Text>
              <Text className={selectedPairData?.priceChangePercent ?? 0 >= 0 ? 'text-green-500' : 'text-red-500'}>
                {selectedPairData?.priceChangePercent.toFixed(2)}%
              </Text>
            </div>
            <div className="flex justify-between">
              <Text>24s Yüksek</Text>
              <Text>{selectedPairData?.high24h.toFixed(2)}</Text>
            </div>
            <div className="flex justify-between">
              <Text>24s Düşük</Text>
              <Text>{selectedPairData?.low24h.toFixed(2)}</Text>
            </div>
            <div className="flex justify-between">
              <Text>24s Hacim</Text>
              <Text>{selectedPairData?.volume.toLocaleString()}</Text>
            </div>
            
            {selectedPairData?.marketCap && (
              <div className="flex justify-between">
                <Text>Piyasa Değeri</Text>
                <Text>${(selectedPairData.marketCap / 1e9).toFixed(2)}B</Text>
              </div>
            )}
            
            {selectedPairData?.peRatio && (
              <div className="flex justify-between">
                <Text>F/K Oranı</Text>
                <Text>{selectedPairData.peRatio.toFixed(2)}</Text>
              </div>
            )}
            
            {selectedPairData?.dividendYield && (
              <div className="flex justify-between">
                <Text>Temettü Verimi</Text>
                <Text>{(selectedPairData.dividendYield * 100).toFixed(2)}%</Text>
              </div>
            )}
          </div>

          {/* Teknik Göstergeler */}
          {selectedPairData?.technicalIndicators && (
            <div className="p-4 border-t border-gray-800">
              <Text className="font-medium mb-2">Teknik Göstergeler</Text>
              <div className="space-y-2">
                {selectedPairData.technicalIndicators.map(indicator => (
                  <div key={indicator.name} className="flex justify-between items-center">
                    <Text>{indicator.name}</Text>
                    <Badge
                      color={
                        indicator.signal === 'buy' ? 'green' :
                        indicator.signal === 'sell' ? 'red' : 
                        'gray'
                      }
                    >
                      {indicator.signal.toUpperCase()}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* İşlem Formu */}
          <div id="trade-form" className="p-4 border-t border-gray-800">
            <PlaceOrder 
              pair={selectedPair.symbol}
              balance={{
                base: 1000,
                quote: 100000
              }}
              lastPrice={selectedPairData?.lastPrice}
            />
          </div>
        </Card>

        {/* Orta Panel - Grafik */}
        <Card className="lg:col-span-2">
          <div className="p-4 border-b border-gray-800">
            <TabGroup 
              index={['1D', '1W', '1M', '3M', '1Y'].indexOf(timeframe)}
              onIndexChange={(index) => setTimeframe(['1D', '1W', '1M', '3M', '1Y'][index])}
            >
              <TabList>
                <Tab>1G</Tab>
                <Tab>1H</Tab>
                <Tab>1A</Tab>
                <Tab>3A</Tab>
                <Tab>1Y</Tab>
              </TabList>
            </TabGroup>
          </div>
          
          <div className="p-4">
            <ChartComponent 
              data={chartData || []}
              interval={timeframe}
              symbol={selectedPair.name}
              indicators={selectedPairData?.technicalIndicators}
            />
          </div>
        </Card>

        {/* Sağ Panel - Emir Defteri ve İşlem Geçmişi */}
        <Card className="lg:col-span-1">
          <TabGroup>
            <TabList>
              <Tab>Emir Defteri</Tab>
              <Tab>Son İşlemler</Tab>
              <Tab>Alarmlar</Tab>
            </TabList>
            <div className="p-4">
              {/* Emir Defteri */}
              <OrderBook 
                pair={selectedPair.symbol}
                precision={2}
              />
              
              {/* İşlem Geçmişi */}
              <TradeHistory pair={selectedPair.symbol} />
              
              {/* Alarmlar */}
              <div className="space-y-2">
                {alerts
                  .filter(alert => alert.symbol === selectedPair.symbol)
                  .map(alert => (
                    <Card key={alert.id} className="p-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <Text>{alert.condition === 'above' ? '⬆️' : '⬇️'}</Text>
                          <Text>{alert.value.toFixed(2)}</Text>
                        </div>
                        <Button
                          size="xs"
                          variant="light"
                          onClick={() => removeAlert(alert.id)}
                        >
                          ❌
                        </Button>
                      </div>
                    </Card>
                  ))
                }
                
                {selectedPairData && (
                  <div className="flex gap-2 mt-4">
                    <Button
                      size="xs"
                      onClick={() => addAlert({
                        symbol: selectedPair.symbol,
                        condition: 'above',
                        value: selectedPairData.lastPrice * 1.05
                      })}
                    >
                      +5% ⬆️
                    </Button>
                    <Button
                      size="xs"
                      onClick={() => addAlert({
                        symbol: selectedPair.symbol,
                        condition: 'below',
                        value: selectedPairData.lastPrice * 0.95
                      })}
                    >
                      -5% ⬇️
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </TabGroup>
        </Card>
      </div>
    </main>
  )
}