'use client'

import { useState, useEffect } from 'react'

interface Balance {
  asset: string
  free: number
  locked: number
}

interface UserWalletProps {
  type: 'crypto' | 'forex' | 'stocks'
}

export function UserWallet({ type }: UserWalletProps) {
  const [balances, setBalances] = useState<Balance[]>([])

  // Simüle edilmiş veri
  useEffect(() => {
    const generateBalances = (): Balance[] => {
      switch (type) {
        case 'crypto':
          return [
            { asset: 'BTC', free: 0.1234, locked: 0.0123 },
            { asset: 'ETH', free: 2.5678, locked: 0.1234 },
            { asset: 'USDT', free: 1000.00, locked: 100.00 },
            { asset: 'KK99', free: 5000.00, locked: 0.00 }
          ]
        case 'forex':
          return [
            { asset: 'USD', free: 10000.00, locked: 1000.00 },
            { asset: 'EUR', free: 8000.00, locked: 500.00 },
            { asset: 'KK99', free: 5000.00, locked: 0.00 }
          ]
        case 'stocks':
          return [
            { asset: 'AAPL', free: 10, locked: 0 },
            { asset: 'GOOGL', free: 5, locked: 0 },
            { asset: 'KK99', free: 5000.00, locked: 0.00 }
          ]
        default:
          return []
      }
    }

    setBalances(generateBalances())
  }, [type])

  return (
    <div className="space-y-4">
      {balances.map((balance) => (
        <div key={balance.asset} className="bg-gray-700 rounded p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-bold">{balance.asset}</span>
            <span className="text-sm text-gray-300">
              Toplam: {(balance.free + balance.locked).toFixed(8)}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-gray-400">Kullanılabilir:</span>
              <span className="ml-2">{balance.free.toFixed(8)}</span>
            </div>
            <div>
              <span className="text-gray-400">Kullanımda:</span>
              <span className="ml-2">{balance.locked.toFixed(8)}</span>
            </div>
          </div>
        </div>
      ))}

      <button className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded">
        Para Yatır/Çek
      </button>
    </div>
  )
}