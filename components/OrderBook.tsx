'use client'

import { useState, useEffect } from 'react'

interface Order {
  price: number
  amount: number
  total: number
}

interface OrderBookProps {
  pair: string
}

export function OrderBook({ pair }: OrderBookProps) {
  const [asks, setAsks] = useState<Order[]>([])
  const [bids, setBids] = useState<Order[]>([])

  // Simüle edilmiş veri
  useEffect(() => {
    const basePrice = pair === 'BTCUSDT' ? 35000 : 2000
    
    const generateOrders = (basePrice: number, isBids: boolean): Order[] => {
      return Array.from({ length: 10 }, (_, i) => ({
        price: basePrice + (isBids ? -i * 10 : i * 10),
        amount: Math.random() * 2,
        total: 0
      })).map(order => ({
        ...order,
        total: order.price * order.amount
      }))
    }

    setAsks(generateOrders(basePrice, false))
    setBids(generateOrders(basePrice, true))
  }, [pair])

  return (
    <div className="flex flex-col h-full">
      <div className="grid grid-cols-3 gap-2 text-sm font-semibold mb-2">
        <div>Fiyat</div>
        <div>Miktar</div>
        <div>Toplam</div>
      </div>
      
      {/* Satış Emirleri */}
      <div className="space-y-1 mb-4">
        {asks.map((order, i) => (
          <div key={`ask-${i}`} className="grid grid-cols-3 gap-2 text-red-500 text-sm">
            <div>{order.price.toFixed(2)}</div>
            <div>{order.amount.toFixed(6)}</div>
            <div>{order.total.toFixed(2)}</div>
          </div>
        ))}
      </div>

      {/* Alış Emirleri */}
      <div className="space-y-1">
        {bids.map((order, i) => (
          <div key={`bid-${i}`} className="grid grid-cols-3 gap-2 text-green-500 text-sm">
            <div>{order.price.toFixed(2)}</div>
            <div>{order.amount.toFixed(6)}</div>
            <div>{order.total.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}