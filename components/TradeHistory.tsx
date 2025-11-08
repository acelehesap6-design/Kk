'use client'

import { useState, useEffect } from 'react'
import { Card, Title, Badge, Table, TableRow, TableCell, TableHead, TableHeaderCell, TableBody } from '@tremor/react'

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
    const interval = setInterval(() => {
      setTrades(prev => {
        const newTrade = {
          id: `trade-${Date.now()}`,
          price: basePrice + (Math.random() - 0.5) * 100,
          amount: Math.random() * 2,
          side: Math.random() > 0.5 ? 'buy' : 'sell',
          time: new Date().toLocaleTimeString()
        }
        return [newTrade, ...prev.slice(0, 19)]
      })
    }, 5000)

    const initialTrades = Array.from({ length: 20 }, (_, i) => ({
      id: `trade-${i}`,
      price: basePrice + (Math.random() - 0.5) * 100,
      amount: Math.random() * 2,
      side: Math.random() > 0.5 ? 'buy' : 'sell',
      time: new Date(Date.now() - i * 60000).toLocaleTimeString()
    }))

    setTrades(initialTrades)

    return () => clearInterval(interval)
  }, [pair])

  const baseAsset = pair.split('USDT')[0]
  const quoteAsset = 'USDT'

  return (
    <Card className="p-0">
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <Title>Son İşlemler</Title>
          <Badge>{pair}</Badge>
        </div>
      </div>

      <div className="overflow-auto max-h-[400px]">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Fiyat</TableHeaderCell>
              <TableHeaderCell>Miktar ({baseAsset})</TableHeaderCell>
              <TableHeaderCell>Toplam ({quoteAsset})</TableHeaderCell>
              <TableHeaderCell>Zaman</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trades.map((trade) => (
              <TableRow key={trade.id}>
                <TableCell>
                  <span className={trade.side === 'buy' ? 'text-green-500' : 'text-red-500'}>
                    {trade.price.toFixed(2)}
                  </span>
                </TableCell>
                <TableCell>{trade.amount.toFixed(6)}</TableCell>
                <TableCell>{(trade.price * trade.amount).toFixed(2)}</TableCell>
                <TableCell>
                  <span className="text-gray-400">{trade.time}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  )
}