'use client'

import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { 
  Card, 
  Text, 
  Title, 
  TabGroup, 
  Tab, 
  TabList,
  Badge,
  Select,
  SelectItem,
  Grid,
} from '@tremor/react'
import { ChartComponent } from '@/components/Chart'
import { MarketType, getMarketsByType } from '@/lib/market-service'

type FilterCategory = 'all' | 'Government' | 'Corporate' | 'Municipal' | 'High-Yield'

export default function BondsPage() {
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('all')
  const [selectedCountry, setSelectedCountry] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'yield' | 'maturity' | 'rating'>('yield')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [timeframe, setTimeframe] = useState('1W')
  
  // Market verilerini çek
  const { data: bonds } = useQuery({
    queryKey: ['markets', 'bonds'],
    queryFn: () => getMarketsByType('bonds'),
    refetchInterval: 10000
  })

  // Filtreleme ve sıralama
  const filteredBonds = bonds?.filter(bond => {
    if (selectedCategory !== 'all' && bond.category !== selectedCategory) return false
    if (selectedCountry !== 'all' && bond.country !== selectedCountry) return false
    return true
  }).sort((a, b) => {
    let comparison = 0
    switch (sortBy) {
      case 'yield':
        comparison = (a.yieldToMaturity || 0) - (b.yieldToMaturity || 0)
        break
      case 'maturity':
        comparison = new Date(a.maturityDate || '').getTime() - new Date(b.maturityDate || '').getTime()
        break
      case 'rating':
        comparison = (a.rating || '').localeCompare(b.rating || '')
        break
    }
    return sortOrder === 'asc' ? comparison : -comparison
  })

  // Mevcut ülkeleri çıkar
  const countries = [...new Set(bonds?.map(b => b.country).filter(Boolean))]
  
  return (
    <main className="p-4 md:p-6 lg:p-8">
      <div className="mb-8">
        <Title>Tahvil ve Bono Piyasası</Title>
        <Text>Global tahvil ve bono piyasalarını takip edin</Text>
      </div>

      {/* Filtreler */}
      <Card className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Text>Kategori</Text>
            <Select value={selectedCategory} onValueChange={val => setSelectedCategory(val as FilterCategory)}>
              <SelectItem value="all">Tümü</SelectItem>
              <SelectItem value="Government">Devlet Tahvilleri</SelectItem>
              <SelectItem value="Corporate">Şirket Tahvilleri</SelectItem>
              <SelectItem value="Municipal">Belediye Tahvilleri</SelectItem>
              <SelectItem value="High-Yield">Yüksek Getirili</SelectItem>
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
              <SelectItem value="yield">Getiri</SelectItem>
              <SelectItem value="maturity">Vade</SelectItem>
              <SelectItem value="rating">Kredi Notu</SelectItem>
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

      {/* Getiri Eğrisi */}
      <Card className="mb-6">
        <Title>Getiri Eğrisi</Title>
        <div className="h-80">
          <ChartComponent 
            data={bonds?.map(bond => ({
              x: bond.duration || 0,
              y: bond.yieldToMaturity || 0,
              name: bond.name
            })) || []}
            interval={timeframe}
            type="scatter"
          />
        </div>
      </Card>

      {/* Tahvil Listesi */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBonds?.map(bond => (
          <Card key={bond.symbol} className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <Title className="text-base">{bond.name}</Title>
                <Text className="text-sm text-gray-500">{bond.symbol}</Text>
              </div>
              {bond.rating && (
                <Badge color={
                  bond.rating.startsWith('A') ? 'green' :
                  bond.rating.startsWith('B') ? 'yellow' :
                  'red'
                }>
                  {bond.rating}
                </Badge>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm mb-4">
              <div>
                <Text className="text-gray-500">Kupon</Text>
                <Text className="font-medium">{bond.couponRate}%</Text>
              </div>
              <div>
                <Text className="text-gray-500">Getiri</Text>
                <Text className="font-medium">{bond.yieldToMaturity}%</Text>
              </div>
              <div>
                <Text className="text-gray-500">Vade</Text>
                <Text className="font-medium">
                  {bond.maturityDate ? new Date(bond.maturityDate).toLocaleDateString() : '-'}
                </Text>
              </div>
              <div>
                <Text className="text-gray-500">Süre</Text>
                <Text className="font-medium">{bond.duration?.toFixed(2)} yıl</Text>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge>{bond.category}</Badge>
              {bond.country && <Badge>{bond.country}</Badge>}
            </div>
          </Card>
        ))}
      </div>
    </main>
  )
}