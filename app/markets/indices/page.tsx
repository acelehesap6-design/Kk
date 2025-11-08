import { Card, Text, Title, TabGroup, Tab, TabList, Badge, Metric } from '@tremor/react'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { ChartComponent } from '@/components/Chart'
import { OrderBook } from '@/components/OrderBook'
import { TradeHistory } from '@/components/TradeHistory'
import { UserWallet } from '@/components/UserWallet'
import { PlaceOrder } from '@/components/PlaceOrder'
import { getIndicesData, getOHLCV } from '@/lib/market-service'

const INDICES = [
  { symbol: '^GSPC', name: 'S&P 500', country: 'USA', description: 'Standard & Poor\'s 500 Index' },
  { symbol: '^DJI', name: 'Dow Jones', country: 'USA', description: 'Dow Jones Industrial Average' },
  { symbol: '^IXIC', name: 'NASDAQ', country: 'USA', description: 'NASDAQ Composite Index' },
  { symbol: '^FTSE', name: 'FTSE 100', country: 'UK', description: 'Financial Times Stock Exchange 100 Index' },
  { symbol: '^N225', name: 'Nikkei 225', country: 'Japan', description: 'Nikkei Stock Average' },
  { symbol: '^GDAXI', name: 'DAX', country: 'Germany', description: 'Deutscher Aktienindex' }
]

export default function IndicesMarket() {
  const [selectedIndex, setSelectedIndex] = useState(INDICES[0])
  const [timeframe, setTimeframe] = useState('1D')

  // Endeks verilerini çek
  const { data: indexRates, isLoading } = useQuery({
    queryKey: ['indices'],
    queryFn: getIndicesData,
    refetchInterval: 10000
  })

  // OHLCV verilerini çek
  const { data: chartData } = useQuery({
    queryKey: ['index-ohlcv', selectedIndex.symbol, timeframe],
    queryFn: () => getOHLCV(selectedIndex.symbol, timeframe),
    refetchInterval: 60000
  })

  // Seçili endeksin detaylarını bul
  const selectedIndexData = indexRates?.find(rate => rate.symbol === selectedIndex.name)

  return (
    <main className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Title>Dünya Endeksleri</Title>
            <Text>Önde gelen global endekslerden anlık fiyat takibi ve alım-satım yapın</Text>
          </div>
          <UserWallet type="indices" />
        </div>
      </div>

      {/* Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        {INDICES.map((index) => {
          const data = indexRates?.find(rate => rate.symbol === index.name)
          const trend = data?.priceChangePercent ?? 0
          
          return (
            <Card 
              key={index.symbol}
              className={`cursor-pointer transition-all hover:scale-[1.02] ${
                selectedIndex.symbol === index.symbol ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedIndex(index)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <Text className="font-medium">{index.name}</Text>
                  <Badge>{index.country}</Badge>
                </div>
                <Text className={trend >= 0 ? 'text-green-500' : 'text-red-500'}>
                  {trend >= 0 ? '+' : ''}{trend.toFixed(2)}%
                </Text>
              </div>
              <div className="mt-2">
                <Metric>{data?.lastPrice.toFixed(2)}</Metric>
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
            <div>
              <Title>{selectedIndex.name}</Title>
              <Text className="text-muted-foreground">{selectedIndex.description}</Text>
              <Badge className="mt-2">{selectedIndex.country}</Badge>
            </div>
          </div>

          <div className="px-4 space-y-2">
            <div className="flex justify-between">
              <Text>Son Değer</Text>
              <Text className="font-medium">{selectedIndexData?.lastPrice.toFixed(2)}</Text>
            </div>
            <div className="flex justify-between">
              <Text>24s Değişim</Text>
              <Text className={selectedIndexData?.priceChangePercent ?? 0 >= 0 ? 'text-green-500' : 'text-red-500'}>
                {selectedIndexData?.priceChangePercent.toFixed(2)}%
              </Text>
            </div>
            <div className="flex justify-between">
              <Text>24s Yüksek</Text>
              <Text>{selectedIndexData?.high24h.toFixed(2)}</Text>
            </div>
            <div className="flex justify-between">
              <Text>24s Düşük</Text>
              <Text>{selectedIndexData?.low24h.toFixed(2)}</Text>
            </div>
            <div className="flex justify-between">
              <Text>24s Hacim</Text>
              <Text>{selectedIndexData?.volume.toLocaleString()} Lot</Text>
            </div>
          </div>

          <div className="p-4 border-t border-gray-800">
            <PlaceOrder 
              pair={selectedIndex.symbol}
              balance={{
                base: 1000,
                quote: 100000
              }}
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
              symbol={selectedIndex.name}
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
                pair={selectedIndex.symbol}
                precision={2}
              />
              <TradeHistory pair={selectedIndex.symbol} />
            </div>
          </TabGroup>
        </Card>
      </div>
    </main>
  )
}