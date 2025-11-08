'use client'

import { useEffect, useState } from 'react'
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

export default function CryptoMarket() {
  const [selectedPair, setSelectedPair] = useState('BTCUSDT')
  const [orderType, setOrderType] = useState('limit')

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-12 gap-4">
          {/* Market Pairs */}
          <div className="col-span-2 bg-gray-800 rounded-lg p-4">
            <h2 className="text-lg font-bold mb-4">Piyasa Çiftleri</h2>
            <div className="space-y-2">
              <button
                className={`w-full text-left px-3 py-2 rounded ${
                  selectedPair === 'BTCUSDT' ? 'bg-indigo-600' : 'hover:bg-gray-700'
                }`}
                onClick={() => setSelectedPair('BTCUSDT')}
              >
                BTC/USDT
              </button>
              <button
                className={`w-full text-left px-3 py-2 rounded ${
                  selectedPair === 'ETHUSDT' ? 'bg-indigo-600' : 'hover:bg-gray-700'
                }`}
                onClick={() => setSelectedPair('ETHUSDT')}
              >
                ETH/USDT
              </button>
            </div>
          </div>

          {/* Chart */}
          <div className="col-span-7 bg-gray-800 rounded-lg p-4">
            <div className="h-[600px]">
              <TradingViewWidget
                symbol={`BINANCE:${selectedPair}`}
                theme="dark"
                autosize
              />
            </div>
          </div>

          {/* Order Book */}
          <div className="col-span-3 bg-gray-800 rounded-lg p-4">
            <h2 className="text-lg font-bold mb-4">Emir Defteri</h2>
            <OrderBook pair={selectedPair} />
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
            <PlaceOrder type={orderType} pair={selectedPair} />
          </div>

          {/* Trade History */}
          <div className="col-span-4 bg-gray-800 rounded-lg p-4">
            <h2 className="text-lg font-bold mb-4">İşlem Geçmişi</h2>
            <TradeHistory pair={selectedPair} />
          </div>

          {/* User Wallet */}
          <div className="col-span-3 bg-gray-800 rounded-lg p-4">
            <h2 className="text-lg font-bold mb-4">Cüzdan</h2>
            <UserWallet type="crypto" />
          </div>
        </div>
      </div>
    </div>
  )
}