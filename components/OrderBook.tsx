'use client'

import { useState, useEffect } from 'react'
import { Card, Title, Text } from '@tremor/react'

interface Order {
  price: number
  amount: number
  total: number
  percentOfBook: number
}

interface OrderBookProps {
  pair: string
  precision?: number
}

export function OrderBook({ pair, precision = 2 }: OrderBookProps) {
  const [asks, setAsks] = useState<Order[]>([])
  const [bids, setBids] = useState<Order[]>([])
  const [spreadInfo, setSpreadInfo] = useState({ value: 0, percentage: 0 })

  useEffect(() => {
    const basePrice = pair === 'BTCUSDT' ? 35000 : 2000
    
    const generateOrders = (basePrice: number, isBids: boolean): Order[] => {
      const orders = Array.from({ length: 12 }, (_, i) => {
        const price = basePrice + (isBids ? -i * 10 : i * 10)
        const amount = Math.random() * 2
        const total = price * amount
        return { price, amount, total, percentOfBook: 0 }
      })

      const totalVolume = orders.reduce((acc, order) => acc + order.total, 0)
      return orders.map(order => ({
        ...order,
        percentOfBook: (order.total / totalVolume) * 100
      }))
    }

    const newAsks = generateOrders(basePrice, false)
    const newBids = generateOrders(basePrice, true)

    setAsks(newAsks)
    setBids(newBids)

    // Calculate spread
    if (newAsks.length && newBids.length) {
      const lowestAsk = Math.min(...newAsks.map(ask => ask.price))
      const highestBid = Math.max(...newBids.map(bid => bid.price))
      const spread = lowestAsk - highestBid
      const spreadPercentage = (spread / lowestAsk) * 100

      setSpreadInfo({
        value: spread,
        percentage: spreadPercentage
      })
    }
  }, [pair])

  return (
    <Card className="p-0 overflow-hidden">
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <Title>Emir Defteri</Title>
          <div className="text-sm text-gray-400">
            <Text>Spread: {spreadInfo.value.toFixed(precision)} ({spreadInfo.percentage.toFixed(2)}%)</Text>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-2 grid grid-cols-3 gap-2 text-xs font-medium text-gray-500">
          <div>Fiyat ({pair.split('USDT')[1] || 'USDT'})</div>
          <div>Miktar ({pair.split('USDT')[0]})</div>
          <div>Toplam</div>
        </div>

        {/* Satış Emirleri */}
        <div className="space-y-1 mb-4">
          {asks.map((order, i) => (
            <div key={`ask-${i}`} className="order-book-row relative">
              <div className="depth-bar depth-bar-sell" style={{ width: `${order.percentOfBook}%` }} />
              <div className="order-book-sell relative z-10">{order.price.toFixed(precision)}</div>
              <div className="relative z-10">{order.amount.toFixed(6)}</div>
              <div className="relative z-10">{order.total.toFixed(2)}</div>
            </div>
          ))}
        </div>

        {/* Spread Göstergesi */}
        <div className="text-center py-2 text-xs font-medium text-gray-500">
          Spread: {spreadInfo.value.toFixed(precision)} ({spreadInfo.percentage.toFixed(2)}%)
        </div>

        {/* Alış Emirleri */}
        <div className="space-y-1">
          {bids.map((order, i) => (
            <div key={`bid-${i}`} className="order-book-row relative">
              <div className="depth-bar depth-bar-buy" style={{ width: `${order.percentOfBook}%` }} />
              <div className="order-book-buy relative z-10">{order.price.toFixed(precision)}</div>
              <div className="relative z-10">{order.amount.toFixed(6)}</div>
              <div className="relative z-10">{order.total.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}