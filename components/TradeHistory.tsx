'use client'

import { useState, useEffect } from 'react'

interface Trade {
  id: string
  price: number
  amount: number
  side: 'buy' | 'sell'
  time: string
}

interface TradeHistoryProps {
  pair: string
}

export function TradeHistory({ pair }: TradeHistoryProps) {
  const [trades, setTrades] = useState<Trade[]>([])

  // Simüle edilmiş veri
  useEffect(() => {
    const basePrice = pair === 'BTCUSDT' ? 35000 : 2000

    const generateTrades = (): Trade[] => {
      return Array.from({ length: 20 }, (_, i) => ({
        id: `trade-${i}`,
        price: basePrice + (Math.random() - 0.5) * 100,
        amount: Math.random() * 2,
        side: Math.random() > 0.5 ? 'buy' : 'sell',
        time: new Date(Date.now() - i * 60000).toLocaleTimeString()
      }))
    }

    setTrades(generateTrades())
  }, [pair])

  return (
    <div className="space-y-2">
      {trades.map((trade) => (
        <div key={trade.id} className="grid grid-cols-4 gap-2 text-sm">
          <div className={trade.side === 'buy' ? 'text-green-500' : 'text-red-500'}>
            {trade.price.toFixed(2)}
          </div>
          <div className="text-gray-300">{trade.amount.toFixed(6)}</div>
          <div className="text-gray-300">{(trade.price * trade.amount).toFixed(2)}</div>
          <div className="text-gray-400">{trade.time}</div>
        </div>
      ))}
    </div>
  )
}