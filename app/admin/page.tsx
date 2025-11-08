'use client'

import { useState, useEffect } from 'react'

const stats = [
  { name: 'Toplam Kullanıcı', value: '12,345' },
  { name: 'Günlük İşlem Hacmi', value: '$2.4M' },
  { name: 'KK99 Token Fiyatı', value: '$0.85' },
  { name: 'Aktif Emirler', value: '3,456' },
]

interface ChartData {
  date: string
  volume: number
}

export default function AdminDashboard() {
  const [chartData, setChartData] = useState<ChartData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simüle edilmiş veri
    const generateChartData = () => {
      const data: ChartData[] = []
      const now = new Date()
      for (let i = 30; i >= 0; i--) {
        const date = new Date(now)
        date.setDate(date.getDate() - i)
        data.push({
          date: date.toISOString().split('T')[0],
          volume: Math.floor(Math.random() * 5000000) + 1000000
        })
      }
      return data
    }

    setChartData(generateChartData())
    setLoading(false)
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white">Admin Dashboard</h1>

      <dl className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative overflow-hidden rounded-lg bg-gray-800 px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-indigo-500 p-3">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                  />
                </svg>
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-300">{stat.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-white">{stat.value}</p>
            </dd>
          </div>
        ))}
      </dl>

      {/* Son İşlemler */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-white mb-4">Son İşlemler</h2>
        <div className="overflow-hidden shadow ring-1 ring-white ring-opacity-5 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6">
                  İşlem ID
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                  Kullanıcı
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                  İşlem Türü
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                  Miktar
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                  Durum
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700 bg-gray-800">
              {[...Array(5)].map((_, index) => (
                <tr key={index}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-300 sm:pl-6">
                    #{Math.floor(Math.random() * 1000000)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                    user{Math.floor(Math.random() * 1000)}@example.com
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                    {Math.random() > 0.5 ? 'Alış' : 'Satış'}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                    ${(Math.random() * 10000).toFixed(2)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      Math.random() > 0.3
                        ? 'bg-green-500/10 text-green-400'
                        : 'bg-yellow-500/10 text-yellow-400'
                    }`}>
                      {Math.random() > 0.3 ? 'Tamamlandı' : 'Beklemede'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}