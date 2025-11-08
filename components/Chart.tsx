'use client'

import { useEffect, useRef } from 'react'
import { createChart, ColorType, IChartApi } from 'lightweight-charts'
import { Card } from '@tremor/react'

interface ChartComponentProps {
  data: {
    time: string
    open: number
    high: number
    low: number
    close: number
  }[]
  interval?: string
  symbol?: string
}

export function ChartComponent({ data, interval = '1D', symbol = 'BTC/USD' }: ChartComponentProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chart = useRef<IChartApi | null>(null)

  useEffect(() => {
    if (!chartContainerRef.current) return

    chart.current = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: '#0a0a0a' },
        textColor: '#d1d4dc',
      },
      grid: {
        vertLines: { color: '#1a1a1a' },
        horzLines: { color: '#1a1a1a' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 500,
    })

    const candlestickSeries = chart.current.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    })

    candlestickSeries.setData(data)

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current && chart.current) {
        chart.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        })
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (chart.current) {
        chart.current.remove()
      }
    }
  }, [data])

  return (
    <Card className="p-0 overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-semibold text-gray-100">{symbol}</h2>
          <span className="px-2 py-1 text-xs font-medium text-gray-400 bg-gray-800 rounded">
            {interval}
          </span>
        </div>
      </div>
      <div ref={chartContainerRef} className="w-full h-[500px]" />
    </Card>
  )
}