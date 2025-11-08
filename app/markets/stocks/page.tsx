'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { ChartComponent } from '@/components/Chart'
import { OrderBook } from '@/components/OrderBook'
import { TradeHistory } from '@/components/TradeHistory'
import { PlaceOrder } from '@/components/PlaceOrder'
import { UserWallet } from '@/components/UserWallet'

const TradingViewWidget = dynamic(
  () => import('react-tradingview-widget'),
  { ssr: false }
)

export default function StocksMarket() {
  const [selectedSymbol, setSelectedSymbol] = useState('AAPL')
  const [orderType, setOrderType] = useState<'limit' | 'market'>('limit')

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-12 gap-4">
          {/* Market Symbols */}
          <div className="col-span-2 bg-gray-800 rounded-lg p-4">
            <h2 className="text-lg font-bold mb-4">Hisse Senetleri</h2>
            <div className="space-y-2">
              <button
                className={`w-full text-left px-3 py-2 rounded ${
                  selectedSymbol === 'AAPL' ? 'bg-indigo-600' : 'hover:bg-gray-700'
                }`}
                onClick={() => setSelectedSymbol('AAPL')}
              >
                Apple (AAPL)
              </button>
              <button
                className={`w-full text-left px-3 py-2 rounded ${
                  selectedSymbol === 'GOOGL' ? 'bg-indigo-600' : 'hover:bg-gray-700'
                }`}
                onClick={() => setSelectedSymbol('GOOGL')}
              >
                Google (GOOGL)
              </button>
              <button
                className={`w-full text-left px-3 py-2 rounded ${
                  selectedSymbol === 'MSFT' ? 'bg-indigo-600' : 'hover:bg-gray-700'
                }`}
                onClick={() => setSelectedSymbol('MSFT')}
              >
                Microsoft (MSFT)
              </button>
              <button
                className={`w-full text-left px-3 py-2 rounded ${
                  selectedSymbol === 'TSLA' ? 'bg-indigo-600' : 'hover:bg-gray-700'
                }`}
                onClick={() => setSelectedSymbol('TSLA')}
              >
                Tesla (TSLA)
              </button>
            </div>
          </div>

          {/* Chart */}
          <div className="col-span-7 bg-gray-800 rounded-lg p-4">
            <div className="h-[600px]">
              <TradingViewWidget
                symbol={`NASDAQ:${selectedSymbol}`}
                theme="dark"
                autosize
              />
            </div>
          </div>

          {/* Order Book */}
          <div className="col-span-3 bg-gray-800 rounded-lg p-4">
            <h2 className="text-lg font-bold mb-4">Emir Defteri</h2>
            <OrderBook pair={selectedSymbol} />
          </div>

          {/* Trade Form */}
          <div className="col-span-5 bg-gray-800 rounded-lg p-4">
            <div className="flex gap-4 mb-4">
              <button
                className={`px-4 py-2 rounded ${
                  orderType === 'limit' ? 'bg-indigo-600' : 'bg-gray-700'
                }`}
                onClick={() => setOrderType('limit')}
              >
                Limit
              </button>
              <button
                className={`px-4 py-2 rounded ${
                  orderType === 'market' ? 'bg-indigo-600' : 'bg-gray-700'
                }`}
                onClick={() => setOrderType('market')}
              >
                Piyasa
              </button>
            </div>
            <PlaceOrder type={orderType} pair={selectedSymbol} />
          </div>

          {/* Trade History */}
          <div className="col-span-4 bg-gray-800 rounded-lg p-4">
            <h2 className="text-lg font-bold mb-4">İşlem Geçmişi</h2>
            <TradeHistory pair={selectedSymbol} />
          </div>

          {/* User Wallet */}
          <div className="col-span-3 bg-gray-800 rounded-lg p-4">
            <h2 className="text-lg font-bold mb-4">Cüzdan</h2>
            <UserWallet type="stocks" />
          </div>
        </div>
      </div>
    </div>
  )
}