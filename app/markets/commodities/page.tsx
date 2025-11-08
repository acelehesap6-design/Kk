import { Card, Text, Title, TabGroup, Tab, TabList, Badge, Metric } from '@tremor/react'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { ChartComponent } from '@/components/Chart'
import { OrderBook } from '@/components/OrderBook'
import { TradeHistory } from '@/components/TradeHistory'
import { UserWallet } from '@/components/UserWallet'
import { PlaceOrder } from '@/components/PlaceOrder'
import { getCommoditiesData, getOHLCV } from '@/lib/market-service'

const COMMODITIES = [
  { 
    symbol: 'GC=F',
    name: 'Gold',
    category: 'Precious Metals',
    unit: 'USD/oz',
    description: 'Gold Futures'
  },
  { 
    symbol: 'SI=F',
    name: 'Silver',
    category: 'Precious Metals',
    unit: 'USD/oz',
    description: 'Silver Futures'
  },
  { 
    symbol: 'CL=F',
    name: 'Crude Oil',
    category: 'Energy',
    unit: 'USD/bbl',
    description: 'Crude Oil WTI Futures'
  },
  { 
    symbol: 'NG=F',
    name: 'Natural Gas',
    category: 'Energy',
    unit: 'USD/MMBtu',
    description: 'Natural Gas Futures'
  },
  { 
    symbol: 'HG=F',
    name: 'Copper',
    category: 'Base Metals',
    unit: 'USD/lb',
    description: 'Copper Futures'
  },
  { 
    symbol: 'PL=F',
    name: 'Platinum',
    category: 'Precious Metals',
    unit: 'USD/oz',
    description: 'Platinum Futures'
  }
]

export default function CommoditiesMarket() {
  const [selectedCommodity, setSelectedCommodity] = useState(COMMODITIES[0])
  const [timeframe, setTimeframe] = useState('1D')

  // Emtia verilerini çek
  const { data: commodityRates, isLoading } = useQuery({
    queryKey: ['commodities'],
    queryFn: getCommoditiesData,
    refetchInterval: 10000
  })

  // OHLCV verilerini çek
  const { data: chartData } = useQuery({
    queryKey: ['commodity-ohlcv', selectedCommodity.symbol, timeframe],
    queryFn: () => getOHLCV(selectedCommodity.symbol, timeframe),
    refetchInterval: 60000
  })

  // Seçili emtianın detaylarını bul
  const selectedCommodityData = commodityRates?.find(rate => rate.symbol === selectedCommodity.name)

  return (
    <main className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Title>Emtia Piyasası</Title>
            <Text>Global emtia vadeli işlem kontratlarında al-sat yapın</Text>
          </div>
          <UserWallet type="commodities" />
        </div>
      </div>

      {/* Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        {COMMODITIES.map((commodity) => {
          const data = commodityRates?.find(rate => rate.symbol === commodity.name)
          const trend = data?.priceChangePercent ?? 0
          
          return (
            <Card 
              key={commodity.symbol}
              className={`cursor-pointer transition-all hover:scale-[1.02] ${
                selectedCommodity.symbol === commodity.symbol ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedCommodity(commodity)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <Text className="font-medium">{commodity.name}</Text>
                  <Badge>{commodity.category}</Badge>
                </div>
                <Text className={trend >= 0 ? 'text-green-500' : 'text-red-500'}>
                  {trend >= 0 ? '+' : ''}{trend.toFixed(2)}%
                </Text>
              </div>
              <div className="mt-2">
                <Metric>
                  {data?.lastPrice.toFixed(2)} {commodity.unit}
                </Metric>
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
              <Title>{selectedCommodity.name}</Title>
              <Text className="text-muted-foreground">{selectedCommodity.description}</Text>
              <Badge className="mt-2">{selectedCommodity.category}</Badge>
              <Badge className="ml-2">{selectedCommodity.unit}</Badge>
            </div>
          </div>

          <div className="px-4 space-y-2">
            <div className="flex justify-between">
              <Text>Son Fiyat</Text>
              <Text className="font-medium">
                {selectedCommodityData?.lastPrice.toFixed(2)} {selectedCommodity.unit}
              </Text>
            </div>
            <div className="flex justify-between">
              <Text>24s Değişim</Text>
              <Text className={selectedCommodityData?.priceChangePercent ?? 0 >= 0 ? 'text-green-500' : 'text-red-500'}>
                {selectedCommodityData?.priceChangePercent.toFixed(2)}%
              </Text>
            </div>
            <div className="flex justify-between">
              <Text>24s Yüksek</Text>
              <Text>
                {selectedCommodityData?.high24h.toFixed(2)} {selectedCommodity.unit}
              </Text>
            </div>
            <div className="flex justify-between">
              <Text>24s Düşük</Text>
              <Text>
                {selectedCommodityData?.low24h.toFixed(2)} {selectedCommodity.unit}
              </Text>
            </div>
            <div className="flex justify-between">
              <Text>24s Hacim</Text>
              <Text>{selectedCommodityData?.volume.toLocaleString()} Lot</Text>
            </div>
          </div>

          <div className="p-4 border-t border-gray-800">
            <PlaceOrder 
              pair={selectedCommodity.symbol}
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
              symbol={`${selectedCommodity.name} (${selectedCommodity.unit})`}
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
                pair={selectedCommodity.symbol}
                precision={2}
              />
              <TradeHistory pair={selectedCommodity.symbol} />
            </div>
          </TabGroup>
        </Card>
      </div>
    </main>
  )