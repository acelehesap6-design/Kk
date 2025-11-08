'use client'

import Link from 'next/link'

const coldWallets = [
  {
    chain: 'Ethereum (ERC20)',
    address: '0x163c9a2fa9eaf8ebc5bb5b8f8e916eb8f24230a1',
  },
  {
    chain: 'Solana (SPL)',
    address: 'Gp4itYBqqkNRNYtC22QAPyTThPB6Kzx8M1yy2rpXBGxbc',
  },
  {
    chain: 'TRON (TRC20)',
    address: 'THbevzbdxMmUNaN3XFWPkaJe8oSq2C2739',
  },
  {
    chain: 'Bitcoin',
    address: 'bc1pzmdep9lzgzswy0nmepvwmexj286kufcfwjfy4fd6dwuedzltntxse9xmz8',
  },
]

export default function TokenPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="relative isolate overflow-hidden pt-14">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              KK99 Token
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Platform komisyonlarını düşürmek için KK99 token kullanın. 
              Tüm işlemlerinizde %50'ye varan indirimler kazanın.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/auth/register"
                className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
              >
                Hemen Başla
              </Link>
              <a href="#tokenomics" className="text-sm font-semibold leading-6 text-white">
                Tokenomics <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
        {/* Token Satın Alma */}
        <div className="mx-auto max-w-2xl lg:text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            KK99 Token Nasıl Alınır?
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Aşağıdaki soğuk cüzdan adreslerine transfer yaparak KK99 token satın alabilirsiniz. 
            Transferiniz onaylandıktan sonra tokenlarınız hesabınıza otomatik olarak aktarılacaktır.
          </p>
        </div>

        {/* Cüzdan Adresleri */}
        <div className="mx-auto max-w-2xl divide-y divide-gray-700">
          {coldWallets.map((wallet) => (
            <div key={wallet.chain} className="py-6">
              <h3 className="text-lg font-semibold text-white mb-2">{wallet.chain}</h3>
              <div className="flex items-center gap-2">
                <code className="flex-1 block rounded bg-gray-800 px-4 py-3 font-mono text-sm text-gray-300">
                  {wallet.address}
                </code>
                <button
                  onClick={() => navigator.clipboard.writeText(wallet.address)}
                  className="rounded bg-gray-700 p-2 hover:bg-gray-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-300">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Tokenomics */}
        <div id="tokenomics" className="mx-auto max-w-2xl mt-32">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-16 lg:text-center">
            Tokenomics
          </h2>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2">
            <div className="border border-gray-700 rounded-lg p-6">
              <dt className="text-lg font-semibold leading-7 text-white mb-4">
                Toplam Arz
              </dt>
              <dd className="text-base leading-7 text-gray-300">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Maksimum Arz: 100,000,000 KK99</li>
                  <li>Dolaşımdaki Arz: 25,000,000 KK99</li>
                  <li>Kilitli Arz: 75,000,000 KK99</li>
                </ul>
              </dd>
            </div>
            <div className="border border-gray-700 rounded-lg p-6">
              <dt className="text-lg font-semibold leading-7 text-white mb-4">
                Token Dağılımı
              </dt>
              <dd className="text-base leading-7 text-gray-300">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Ekosistem Fonu: 40%</li>
                  <li>Likidite: 30%</li>
                  <li>Ekip: 20%</li>
                  <li>Marketing: 10%</li>
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}