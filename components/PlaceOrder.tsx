'use client'

import { useState } from 'react'
import { Card, Title, TextInput, Button, NumberInput, Tabs, Select } from '@tremor/react'

interface PlaceOrderProps {
  pair: string
  balance?: {
    base: number
    quote: number
  }
}

export function PlaceOrder({ pair, balance = { base: 0, quote: 0 } }: PlaceOrderProps) {
  const [orderType, setOrderType] = useState<'limit' | 'market'>('limit')
  const [side, setSide] = useState<'buy' | 'sell'>('buy')
  const [price, setPrice] = useState('')
  const [amount, setAmount] = useState('')
  const [total, setTotal] = useState<number>(0)
  const [percentageAmount, setPercentageAmount] = useState<number>(0)

  const baseAsset = pair.split('USDT')[0]
  const quoteAsset = 'USDT'

  const handlePercentageChange = (percentage: number) => {
    setPercentageAmount(percentage)
    if (side === 'buy') {
      const maxQuote = balance.quote
      const amount = (maxQuote * percentage) / 100
      setTotal(amount)
      if (price) {
        setAmount((amount / parseFloat(price)).toFixed(6))
      }
    } else {
      const maxBase = balance.base
      const amount = (maxBase * percentage) / 100
      setAmount(amount.toFixed(6))
      if (price) {
        setTotal(amount * parseFloat(price))
      }
    }
  }

  const handlePriceChange = (value: string) => {
    setPrice(value)
    if (amount) {
      setTotal(parseFloat(amount) * parseFloat(value))
    }
  }

  const handleAmountChange = (value: string) => {
    setAmount(value)
    if (price) {
      setTotal(parseFloat(value) * parseFloat(price))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement order submission
    console.log({
      type: orderType,
      side,
      price,
      amount,
      total,
      pair
    })
  }

  return (
    <Card className="p-0">
      <div className="p-4 border-b border-gray-800">
        <Title>İşlem Yap</Title>
      </div>

      <Tabs
        defaultValue={orderType}
        onValueChange={(value) => setOrderType(value as 'limit' | 'market')}
        className="p-4"
      >
        <Tabs.List>
          <Tabs.Tab value="limit" text="Limit" />
          <Tabs.Tab value="market" text="Market" />
        </Tabs.List>
      </Tabs>

      <form onSubmit={handleSubmit} className="p-4 pt-0 space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant={side === 'buy' ? 'primary' : 'secondary'}
            onClick={() => setSide('buy')}
            className={side === 'buy' ? 'bg-green-600 hover:bg-green-700' : ''}
          >
            Al
          </Button>
          <Button
            variant={side === 'sell' ? 'primary' : 'secondary'}
            onClick={() => setSide('sell')}
            className={side === 'sell' ? 'bg-red-600 hover:bg-red-700' : ''}
          >
            Sat
          </Button>
        </div>

        {orderType === 'limit' && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Fiyat ({quoteAsset})</label>
            <NumberInput
              value={price}
              onValueChange={handlePriceChange}
              placeholder="0.00"
              enableStepper={false}
              min={0}
              required
            />
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Miktar ({baseAsset})</label>
          <NumberInput
            value={amount}
            onValueChange={handleAmountChange}
            placeholder="0.00"
            enableStepper={false}
            min={0}
            required
          />
        </div>

        <div className="grid grid-cols-4 gap-2">
          {[25, 50, 75, 100].map((percent) => (
            <Button
              key={percent}
              variant="secondary"
              size="xs"
              onClick={() => handlePercentageChange(percent)}
              className={percentageAmount === percent ? 'ring-2 ring-primary' : ''}
            >
              {percent}%
            </Button>
          ))}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Toplam ({quoteAsset})</label>
          <NumberInput
            value={total.toString()}
            readOnly
            placeholder="0.00"
            enableStepper={false}
          />
        </div>

        <div className="text-sm text-gray-400 space-y-1">
          <div>
            Kullanılabilir {baseAsset}: {balance.base.toFixed(6)}
          </div>
          <div>
            Kullanılabilir {quoteAsset}: {balance.quote.toFixed(2)}
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          className={`w-full ${
            side === 'buy'
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-red-600 hover:bg-red-700'
          }`}
        >
          {side === 'buy' ? `${baseAsset} Satın Al` : `${baseAsset} Sat`}
        </Button>
      </form>
    </Card>
  )
}