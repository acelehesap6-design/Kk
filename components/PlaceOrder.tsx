'use client'

import { useState } from 'react'

interface PlaceOrderProps {
  type: 'limit' | 'market'
  pair: string
}

export function PlaceOrder({ type, pair }: PlaceOrderProps) {
  const [side, setSide] = useState<'buy' | 'sell'>('buy')
  const [price, setPrice] = useState('')
  const [amount, setAmount] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement order submission
    console.log({
      type,
      side,
      price,
      amount,
      pair
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-4">
        <button
          type="button"
          className={`flex-1 px-4 py-2 rounded ${
            side === 'buy'
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-gray-700 hover:bg-gray-600'
          }`}
          onClick={() => setSide('buy')}
        >
          Al
        </button>
        <button
          type="button"
          className={`flex-1 px-4 py-2 rounded ${
            side === 'sell'
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-gray-700 hover:bg-gray-600'
          }`}
          onClick={() => setSide('sell')}
        >
          Sat
        </button>
      </div>

      {type === 'limit' && (
        <div>
          <label className="block text-sm font-medium text-gray-300">Fiyat</label>
          <input
            type="number"
            step="any"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 block w-full rounded bg-gray-700 border-gray-600 text-white px-3 py-2"
            placeholder="0.00"
            required
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-300">Miktar</label>
        <input
          type="number"
          step="any"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-1 block w-full rounded bg-gray-700 border-gray-600 text-white px-3 py-2"
          placeholder="0.00"
          required
        />
      </div>

      <button
        type="submit"
        className={`w-full px-4 py-2 rounded ${
          side === 'buy'
            ? 'bg-green-600 hover:bg-green-700'
            : 'bg-red-600 hover:bg-red-700'
        }`}
      >
        {side === 'buy' ? 'Satın Al' : 'Sat'}
      </button>
    </form>
  )
}