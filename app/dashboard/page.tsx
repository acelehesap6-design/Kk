'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Balance {
  asset: string
  free: number
  locked: number
  value: number
}

interface RecentTrade {
  id: string
  market: string
  side: 'buy' | 'sell'
  price: number
  amount: number
  total: number
  date: string
}

export default function Dashboard() {
  const [balances, setBalances] = useState<Balance[]>([])
  const [recentTrades, setRecentTrades] = useState<RecentTrade[]>([])
  const [totalPortfolioValue, setTotalPortfolioValue] = useState(0)

  useEffect(() => {
    // Simüle edilmiş veri
    const mockBalances: Balance[] = [
      { asset: 'BTC', free: 0.1234, locked: 0.0123, value: 45678.90 },
      { asset: 'ETH', free: 2.5678, locked: 0.1234, value: 12345.67 },
      { asset: 'USDT', free: 1000.00, locked: 100.00, value: 1100.00 },
      { asset: 'KK99', free: 5000.00, locked: 0.00, value: 4250.00 },
    ]

    const mockTrades: RecentTrade[] = Array.from({ length: 5 }, (_, i) => ({
      id: `trade-${i}`,
      market: ['BTC/USDT', 'ETH/USDT', 'KK99/USDT'][Math.floor(Math.random() * 3)],
      side: Math.random() > 0.5 ? 'buy' : 'sell',
      price: Math.random() * 50000,
      amount: Math.random() * 2,
      total: Math.random() * 10000,
      date: new Date(Date.now() - i * 3600000).toLocaleString(),
    }))

    setBalances(mockBalances)
    setRecentTrades(mockTrades)
    setTotalPortfolioValue(mockBalances.reduce((sum, b) => sum + b.value, 0))
  }, [])

  return (
    <div className="space-y-8">
      {/* Portföy Özeti */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Portföy Özeti</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="text-sm text-gray-400">Toplam Portföy Değeri</div>
            <div className="text-2xl font-bold text-white">${totalPortfolioValue.toFixed(2)}</div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="text-sm text-gray-400">24s Değişim</div>
            <div className="text-2xl font-bold text-green-500">+2.34%</div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="text-sm text-gray-400">Açık Emirler</div>
            <div className="text-2xl font-bold text-white">3</div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="text-sm text-gray-400">KK99 Bakiyesi</div>
            <div className="text-2xl font-bold text-indigo-400">5,000 KK99</div>
          </div>
        </div>
      </div>

      {/* Varlıklar */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white">Varlıklarım</h2>
          <Link href="/dashboard/portfolio" className="text-sm text-indigo-400 hover:text-indigo-300">
            Tümünü Gör →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Varlık</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Bakiye</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Kullanımda</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Toplam Değer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {balances.map((balance) => (
                <tr key={balance.asset}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{balance.asset}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{balance.free.toFixed(8)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{balance.locked.toFixed(8)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">${balance.value.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Son İşlemler */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white">Son İşlemler</h2>
          <Link href="/dashboard/history" className="text-sm text-indigo-400 hover:text-indigo-300">
            Tümünü Gör →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Market</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">İşlem</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Fiyat</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Miktar</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Toplam</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Tarih</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {recentTrades.map((trade) => (
                <tr key={trade.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{trade.market}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`inline-flex rounded-full px-2 text-xs font-semibold ${
                      trade.side === 'buy'
                        ? 'bg-green-500/10 text-green-400'
                        : 'bg-red-500/10 text-red-400'
                    }`}>
                      {trade.side === 'buy' ? 'Alış' : 'Satış'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">${trade.price.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{trade.amount.toFixed(8)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">${trade.total.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{trade.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}