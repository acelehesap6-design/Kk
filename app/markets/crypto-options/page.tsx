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

type OptionType = 'call' | 'put'
type ExpiryFilter = 'weekly' | 'monthly' | 'quarterly' | 'all'

export default function OptionsPage() {
  const [selectedUnderlying, setSelectedUnderlying] = useState('')
  const [selectedStrike, setSelectedStrike] = useState<number>()
  const [selectedType, setSelectedType] = useState<OptionType>('call')
  const [expiryFilter, setExpiryFilter] = useState<ExpiryFilter>('all')
  const [timeframe, setTimeframe] = useState('1D')

  // Market verilerini çek
  const { data: options } = useQuery({
    queryKey: ['markets', 'crypto-options'],
    queryFn: () => getMarketsByType('crypto-options'),
    refetchInterval: 5000
  })

  // Altta yatan varlıkları grupla
  const underlyingAssets = [...new Set(options?.map(opt => opt.baseAsset))]

  // Seçili varlık için opsiyonları filtrele
  const filteredOptions = options?.filter(option => {
    if (selectedUnderlying && option.baseAsset !== selectedUnderlying) return false
    if (expiryFilter !== 'all') {
      const expiry = new Date(option.expiryDate || '')
      const now = new Date()
      const diff = expiry.getTime() - now.getTime()
      const days = diff / (1000 * 60 * 60 * 24)
      
      switch(expiryFilter) {
        case 'weekly':
          if (days > 7) return false
          break
        case 'monthly':
          if (days > 30) return false
          break
        case 'quarterly':
          if (days > 90) return false
          break
      }
    }
    return true
  })

  // Strike fiyatlarını grupla
  const strikes = [...new Set(filteredOptions?.map(opt => opt.strikePrice))]
  
  // Seçili opsiyon
  const selectedOption = options?.find(opt => 
    opt.baseAsset === selectedUnderlying &&
    opt.strikePrice === selectedStrike &&
    opt.category.toLowerCase() === selectedType
  )

  return (
    <main className="p-4 md:p-6 lg:p-8">
      <div className="mb-8">
        <Title>Opsiyon Piyasaları</Title>
        <Text>Kripto opsiyon kontratlarını analiz edin ve işlem yapın</Text>
      </div>

      {/* Filtreler */}
      <Card className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Text>Varlık</Text>
            <Select 
              value={selectedUnderlying} 
              onValueChange={setSelectedUnderlying}
            >
              <SelectItem value="">Seçiniz</SelectItem>
              {underlyingAssets.map(asset => (
                <SelectItem key={asset} value={asset}>{asset}</SelectItem>
              ))}
            </Select>
          </div>

          <div>
            <Text>Vade</Text>
            <Select 
              value={expiryFilter}
              onValueChange={val => setExpiryFilter(val as ExpiryFilter)}
            >
              <SelectItem value="all">Tümü</SelectItem>
              <SelectItem value="weekly">Haftalık</SelectItem>
              <SelectItem value="monthly">Aylık</SelectItem>
              <SelectItem value="quarterly">Üç Aylık</SelectItem>
            </Select>
          </div>

          <div>
            <Text>Opsiyon Tipi</Text>
            <div className="flex gap-2">
              <button
                className={`flex-1 px-4 py-2 rounded ${
                  selectedType === 'call' ? 'bg-green-500 text-white' : 'bg-gray-100'
                }`}
                onClick={() => setSelectedType('call')}
              >
                CALL
              </button>
              <button
                className={`flex-1 px-4 py-2 rounded ${
                  selectedType === 'put' ? 'bg-red-500 text-white' : 'bg-gray-100'
                }`}
                onClick={() => setSelectedType('put')}
              >
                PUT
              </button>
            </div>
          </div>

          <div>
            <Text>Strike Fiyatı</Text>
            <Select
              value={selectedStrike?.toString() || ''}
              onValueChange={val => setSelectedStrike(Number(val))}
            >
              <SelectItem value="">Seçiniz</SelectItem>
              {strikes.map(strike => (
                <SelectItem key={strike} value={strike.toString()}>
                  ${strike}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
      </Card>

      {/* Ana Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sol Panel - Opsiyon Zinciri */}
        <Card className="lg:col-span-4">
          <Title>Opsiyon Zinciri</Title>
          {selectedUnderlying ? (
            <div className="mt-4">
              <TabGroup>
                <TabList>
                  <Tab>CALL</Tab>
                  <Tab>PUT</Tab>
                </TabList>
                <div className="mt-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="py-2">Strike</th>
                        <th className="py-2">Son</th>
                        <th className="py-2">Değişim</th>
                        <th className="py-2">IV</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOptions
                        ?.filter(opt => opt.category.toLowerCase() === selectedType)
                        .map(option => (
                          <tr
                            key={option.symbol}
                            className={`border-b cursor-pointer hover:bg-gray-50 ${
                              selectedStrike === option.strikePrice ? 'bg-gray-100' : ''
                            }`}
                            onClick={() => setSelectedStrike(option.strikePrice)}
                          >
                            <td className="py-2">${option.strikePrice}</td>
                            <td className="py-2">${option.lastPrice.toFixed(4)}</td>
                            <td className={`py-2 ${
                              option.priceChangePercent >= 0 ? 'text-green-500' : 'text-red-500'
                            }`}>
                              {option.priceChangePercent >= 0 ? '+' : ''}
                              {option.priceChangePercent.toFixed(2)}%
                            </td>
                            <td className="py-2">
                              {(option.impliedVolatility || 0 * 100).toFixed(1)}%
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </TabGroup>
            </div>
          ) : (
            <div className="h-40 flex items-center justify-center">
              <Text>Lütfen bir varlık seçin</Text>
            </div>
          )}
        </Card>

        {/* Orta Panel - Grafik ve İşlem */}
        <Card className="lg:col-span-5">
          {selectedOption ? (
            <>
              {/* Opsiyon Detayları */}
              <div className="mb-4">
                <div className="flex justify-between items-baseline">
                  <Title>{selectedOption.name}</Title>
                  <div className="text-right">
                    <Metric>${selectedOption.lastPrice.toFixed(4)}</Metric>
                    <Text className={selectedOption.priceChangePercent >= 0 ? 'text-green-500' : 'text-red-500'}>
                      {selectedOption.priceChangePercent >= 0 ? '+' : ''}
                      {selectedOption.priceChangePercent.toFixed(2)}%
                    </Text>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                  <div>
                    <Text className="text-gray-500">IV</Text>
                    <Text className="font-medium">
                      {(selectedOption.impliedVolatility || 0 * 100).toFixed(1)}%
                    </Text>
                  </div>
                  <div>
                    <Text className="text-gray-500">Delta</Text>
                    <Text className="font-medium">
                      {selectedOption.delta?.toFixed(3)}
                    </Text>
                  </div>
                  <div>
                    <Text className="text-gray-500">Gamma</Text>
                    <Text className="font-medium">
                      {selectedOption.gamma?.toFixed(4)}
                    </Text>
                  </div>
                  <div>
                    <Text className="text-gray-500">Theta</Text>
                    <Text className="font-medium">
                      {selectedOption.theta?.toFixed(4)}
                    </Text>
                  </div>
                  <div>
                    <Text className="text-gray-500">Vega</Text>
                    <Text className="font-medium">
                      {selectedOption.vega?.toFixed(4)}
                    </Text>
                  </div>
                  <div>
                    <Text className="text-gray-500">Vade</Text>
                    <Text className="font-medium">
                      {new Date(selectedOption.expiryDate || '').toLocaleDateString()}
                    </Text>
                  </div>
                </div>
              </div>

              {/* Grafik */}
              <div className="h-80 mb-6">
                <ChartComponent
                  data={[]} // OHLCV verisi gelecek
                  interval={timeframe}
                  symbol={selectedOption.symbol}
                  type="candlestick"
                />
              </div>

              {/* İşlem Formu */}
              <PlaceOrder
                pair={selectedOption.symbol}
                balance={{
                  base: 1000,
                  quote: 100000
                }}
                lastPrice={selectedOption.lastPrice}
              />
            </>
          ) : (
            <div className="h-full flex items-center justify-center">
              <Text>Lütfen bir opsiyon kontratı seçin</Text>
            </div>
          )}
        </Card>

        {/* Sağ Panel - Emir Defteri ve Geçmiş */}
        <Card className="lg:col-span-3">
          {selectedOption ? (
            <TabGroup>
              <TabList>
                <Tab>Emir Defteri</Tab>
                <Tab>Son İşlemler</Tab>
              </TabList>
              <div className="mt-4">
                <OrderBook
                  pair={selectedOption.symbol}
                  precision={4}
                />
                
                <TradeHistory
                  pair={selectedOption.symbol}
                />
              </div>
            </TabGroup>
          ) : (
            <div className="h-full flex items-center justify-center">
              <Text>Lütfen bir opsiyon kontratı seçin</Text>
            </div>
          )}
        </Card>
      </div>
    </main>
  )
}