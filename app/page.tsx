'use client''use client'



import Link from 'next/link'import { useState } from 'react'

import { Card, Text, Title, Button, TabGroup, Tab, TabList, Badge } from '@tremor/react'import { Dialog } from '@headlessui/react'

import Link from 'next/link'

export default function Home() {import { Card, Metric, Text, Tab, TabList, TabGroup, TabPanel, TabPanels, LineChart, BarChart } from '@tremor/react'

  return (import { Icons } from '@/components/icons'

    <main>import { Button } from '@/components/ui/button'

      {/* Header */}

      <header className="bg-white border-b dark:bg-gray-900">const navigation = [

        <div className="container mx-auto px-4">  { name: 'Kripto', href: '/markets/crypto', icon: Icons.Bitcoin },

          <div className="flex justify-between items-center h-16">  { name: 'Forex', href: '/markets/forex', icon: Icons.DollarSign },

            <Link href="/" className="text-xl font-bold">KK Exchange</Link>  { name: 'Hisse Senetleri', href: '/markets/stocks', icon: Icons.TrendingUp },

              { name: 'KK99 Token', href: '/token', icon: Icons.Token },

            <div className="hidden md:flex items-center space-x-4">]

              <Link href="/markets/crypto" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">

                Kriptoconst marketData = {

              </Link>  crypto: [

              <Link href="/markets/forex" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">    {

                Forex      title: "Bitcoin (BTC)",

              </Link>      metric: "$36,789.45",

              <Link href="/markets/stocks" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">      trend: "+5.12%",

                Hisse Senetleri      data: [

              </Link>        { date: "Jan 1", price: 34000 },

              <Link href="/token" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">        { date: "Jan 2", price: 35400 },

                KK99 Token        { date: "Jan 3", price: 36789 },

              </Link>      ],

            </div>    },

                {

            <Link href="/auth/login" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">      title: "Ethereum (ETH)",

              Giriş Yap →      metric: "$2,145.67",

            </Link>      trend: "+3.45%",

          </div>      data: [

        </div>        { date: "Jan 1", price: 2000 },

      </header>        { date: "Jan 2", price: 2100 },

        { date: "Jan 3", price: 2145 },

      {/* Hero Section */}      ],

      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-20">    },

        <div className="container mx-auto px-4">  ],

          <div className="max-w-3xl mx-auto text-center">  forex: [

            <Title className="text-4xl md:text-5xl font-bold mb-6">    {

              Tüm Piyasalar Tek Platformda      title: "EUR/USD",

            </Title>      metric: "1.0865",

            <Text className="text-xl mb-8 text-gray-600 dark:text-gray-300">      trend: "-0.23%",

              Kripto, forex, hisse senetleri ve daha fazlası. KK99 token ile düşük komisyonlardan faydalanın.      data: [

            </Text>        { date: "Jan 1", price: 1.0890 },

            <div className="flex flex-col md:flex-row justify-center gap-4">        { date: "Jan 2", price: 1.0875 },

              <Link href="/markets" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium">        { date: "Jan 3", price: 1.0865 },

                Hemen Başla      ],

              </Link>    },

              <Link href="/token" className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-3 rounded-lg text-lg font-medium border">    {

                KK99 Token Hakkında →      title: "GBP/USD",

              </Link>      metric: "1.2745",

            </div>      trend: "+0.15%",

          </div>      data: [

        </div>        { date: "Jan 1", price: 1.2725 },

      </section>        { date: "Jan 2", price: 1.2735 },

        { date: "Jan 3", price: 1.2745 },

      {/* Market Sections */}      ],

      <section className="py-20">    },

        <div className="container mx-auto px-4">  ],

          <Title className="text-3xl font-bold text-center mb-12">}

            Piyasalarımız

          </Title>export default function Home() {

            const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

          <TabGroup>  

            <TabList className="justify-center mb-8">  return (

              <Tab>Tümü</Tab>    <div className="min-h-screen bg-background">

              <Tab>Kripto</Tab>      <header className="fixed inset-x-0 top-0 z-50 border-b border-gray-800 backdrop-blur-sm bg-background/90">

              <Tab>Forex</Tab>        <nav className="flex items-center justify-between p-4 lg:px-8" aria-label="Global">

              <Tab>Hisse</Tab>          <div className="flex lg:flex-1">

              <Tab>Diğer</Tab>            <Link href="/" className="flex items-center space-x-2">

            </TabList>              <Icons.Logo className="h-8 w-8" />

          </TabGroup>              <span className="text-xl font-bold">KK Exchange</span>

            </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">          </div>

            {/* Kripto */}          

            <Card className="p-6">          <div className="hidden lg:flex lg:gap-x-8">

              <Title className="mb-2">Kripto Piyasaları</Title>            {navigation.map((item) => (

              <Text className="mb-4">              <Link

                Bitcoin, Ethereum ve yüzlerce altcoin. Spot, vadeli ve opsiyon işlemleri.                key={item.name}

              </Text>                href={item.href}

              <div className="flex flex-wrap gap-2 mb-4">                className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"

                <Badge>BTC</Badge>              >

                <Badge>ETH</Badge>                <item.icon className="h-4 w-4" />

                <Badge>SOL</Badge>                <span>{item.name}</span>

                <Badge>BNB</Badge>              </Link>

              </div>            ))}

              <Link href="/markets/crypto" className="text-blue-500 hover:text-blue-600 font-medium">          </div>

                Kripto Piyasasına Git →

              </Link>          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">

            </Card>            <Button variant="outline" asChild>

              <Link href="/auth/login">

            {/* Forex */}                Giriş Yap

            <Card className="p-6">              </Link>

              <Title className="mb-2">Forex Piyasaları</Title>            </Button>

              <Text className="mb-4">            <Button asChild>

                Major, minor ve exotic pariteler. 24/5 kesintisiz işlem imkanı.              <Link href="/auth/register">

              </Text>                Ücretsiz Başla

              <div className="flex flex-wrap gap-2 mb-4">              </Link>

                <Badge>EUR/USD</Badge>            </Button>

                <Badge>GBP/USD</Badge>          </div>

                <Badge>USD/JPY</Badge>        </nav>

                <Badge>USD/TRY</Badge>

              </div>        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>

              <Link href="/markets/forex" className="text-blue-500 hover:text-blue-600 font-medium">          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" />

                Forex Piyasasına Git →          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-800">

              </Link>            <div className="flex items-center justify-between">

            </Card>              <Link href="/" className="-m-1.5 p-1.5">

                <Icons.Logo className="h-8 w-8" />

            {/* Hisse Senetleri */}              </Link>

            <Card className="p-6">              <button

              <Title className="mb-2">Hisse Senetleri</Title>                type="button"

              <Text className="mb-4">                className="-m-2.5 rounded-md p-2.5 text-muted-foreground"

                ABD, Avrupa ve Asya borsalarında işlem gören hisse senetleri.                onClick={() => setMobileMenuOpen(false)}

              </Text>              >

              <div className="flex flex-wrap gap-2 mb-4">                <span className="sr-only">Close menu</span>

                <Badge>AAPL</Badge>                <Icons.X className="h-6 w-6" />

                <Badge>MSFT</Badge>              </button>

                <Badge>GOOGL</Badge>            </div>

                <Badge>AMZN</Badge>            <div className="mt-6 flow-root">

              </div>              <div className="-my-6 divide-y divide-gray-800">

              <Link href="/markets/stocks" className="text-blue-500 hover:text-blue-600 font-medium">                <div className="space-y-2 py-6">

                Hisse Piyasasına Git →                  {navigation.map((item) => (

              </Link>                    <Link

            </Card>                      key={item.name}

          </div>                      href={item.href}

        </div>                      className="flex items-center space-x-2 -mx-3 rounded-lg px-3 py-2 text-base font-semibold text-foreground hover:bg-accent"

      </section>                    >

                      <item.icon className="h-5 w-5" />

      {/* Features */}                      <span>{item.name}</span>

      <section className="bg-white dark:bg-gray-900 py-20">                    </Link>

        <div className="container mx-auto px-4">                  ))}

          <Title className="text-3xl font-bold text-center mb-12">                </div>

            Neden KK Exchange?                <div className="py-6 space-y-4">

          </Title>                  <Button variant="outline" className="w-full" asChild>

                    <Link href="/auth/login">Giriş Yap</Link>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">                  </Button>

            <div className="text-center">                  <Button className="w-full" asChild>

              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-full">                    <Link href="/auth/register">Ücretsiz Başla</Link>

                🔒                  </Button>

              </div>                </div>

              <Title className="mb-2">Güvenli</Title>              </div>

              <Text>            </div>

                En yüksek güvenlik standartları ve soğuk cüzdan depolama.          </Dialog.Panel>

              </Text>        </Dialog>

            </div>      </header>



            <div className="text-center">      <main>

              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-full">        {/* Hero Section */}

                ⚡        <section className="relative pt-32 lg:pt-36">

              </div>          <div className="container px-4 md:px-6">

              <Title className="mb-2">Hızlı</Title>            <div className="flex flex-col items-center space-y-8 text-center">

              <Text>              <div className="space-y-2">

                Saniyeler içinde işlem gerçekleştirme ve düşük gecikme.                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">

              </Text>                  En Gelişmiş Trading Platformu

            </div>                </h1>

                <p className="max-w-[600px] text-muted-foreground md:text-xl">

            <div className="text-center">                  Kripto, forex ve hisse senetleri. Profesyonel trading araçları ve düşük komisyonlarla tüm piyasalara tek platformdan erişin.

              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-full">                </p>

                💰              </div>

              </div>              <div className="flex flex-wrap items-center justify-center gap-4">

              <Title className="mb-2">Uygun</Title>                <Button size="lg" asChild>

              <Text>                  <Link href="/auth/register">

                KK99 token ile %50'ye varan komisyon indirimi.                    Ücretsiz Hesap Aç

              </Text>                  </Link>

            </div>                </Button>

          </div>                <Button size="lg" variant="outline" asChild>

        </div>                  <Link href="/token">

      </section>                    KK99 Token Keşfet

                  </Link>

      {/* CTA */}                </Button>

      <section className="bg-gradient-to-br from-blue-500 to-indigo-600 py-20 text-white">              </div>

        <div className="container mx-auto px-4 text-center">            </div>

          <Title className="text-3xl font-bold mb-4">          </div>

            Hemen Aramıza Katılın        </section>

          </Title>

          <Text className="text-xl mb-8">        {/* Market Overview */}

            Ücretsiz hesap açın ve tüm piyasalara anında erişim kazanın.        <section className="py-20">

          </Text>          <div className="container px-4 md:px-6">

          <Link href="/auth/register" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg text-lg font-medium">            <TabGroup>

            Ücretsiz Hesap Aç              <div className="flex items-center justify-between mb-8">

          </Link>                <h2 className="text-2xl font-bold tracking-tight">Piyasa Özeti</h2>

        </div>                <TabList variant="solid">

      </section>                  <Tab>Kripto</Tab>

                  <Tab>Forex</Tab>

      {/* Footer */}                </TabList>

      <footer className="bg-gray-900 text-gray-300 py-12">              </div>

        <div className="container mx-auto px-4">              <TabPanels>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">                <TabPanel>

            <div>                  <div className="grid gap-6 md:grid-cols-2">

              <Title className="text-white mb-4">KK Exchange</Title>                    {marketData.crypto.map((item, index) => (

              <Text>                      <Card key={index}>

                Global finansal piyasalara erişiminizi sağlayan yeni nesil trading platformu.                        <div className="flex items-start justify-between">

              </Text>                          <div>

            </div>                            <Text>{item.title}</Text>

                            <Metric>{item.metric}</Metric>

            <div>                          </div>

              <Title className="text-white mb-4">Piyasalar</Title>                          <Text className={item.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}>

              <ul className="space-y-2">                            {item.trend}

                <li>                          </Text>

                  <Link href="/markets/crypto" className="hover:text-white">Kripto</Link>                        </div>

                </li>                        <LineChart

                <li>                          data={item.data}

                  <Link href="/markets/forex" className="hover:text-white">Forex</Link>                          index="date"

                </li>                          categories={["price"]}

                <li>                          colors={["blue"]}

                  <Link href="/markets/stocks" className="hover:text-white">Hisse Senetleri</Link>                          showLegend={false}

                </li>                          showGridLines={false}

                <li>                          showXAxis={false}

                  <Link href="/markets/crypto-futures" className="hover:text-white">Vadeli İşlemler</Link>                          showYAxis={false}

                </li>                          height="h

              </ul>

            </div>-24"

                        />

            <div>                      </Card>

              <Title className="text-white mb-4">Şirket</Title>                    ))}

              <ul className="space-y-2">                  </div>

                <li>                </TabPanel>

                  <Link href="/about" className="hover:text-white">Hakkımızda</Link>                <TabPanel>

                </li>                  <div className="grid gap-6 md:grid-cols-2">

                <li>                    {marketData.forex.map((item, index) => (

                  <Link href="/careers" className="hover:text-white">Kariyer</Link>                      <Card key={index}>

                </li>                        <div className="flex items-start justify-between">

                <li>                          <div>

                  <Link href="/contact" className="hover:text-white">İletişim</Link>                            <Text>{item.title}</Text>

                </li>                            <Metric>{item.metric}</Metric>

                <li>                          </div>

                  <Link href="/blog" className="hover:text-white">Blog</Link>                          <Text className={item.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}>

                </li>                            {item.trend}

              </ul>                          </Text>

            </div>                        </div>

                        <LineChart

            <div>                          data={item.data}

              <Title className="text-white mb-4">Yasal</Title>                          index="date"

              <ul className="space-y-2">                          categories={["price"]}

                <li>                          colors={["blue"]}

                  <Link href="/privacy" className="hover:text-white">Gizlilik Politikası</Link>                          showLegend={false}

                </li>                          showGridLines={false}

                <li>                          showXAxis={false}

                  <Link href="/terms" className="hover:text-white">Kullanım Koşulları</Link>                          showYAxis={false}

                </li>                          height="h-24"

                <li>                        />

                  <Link href="/compliance" className="hover:text-white">Uyum</Link>                      </Card>

                </li>                    ))}

                <li>                  </div>

                  <Link href="/security" className="hover:text-white">Güvenlik</Link>                </TabPanel>

                </li>              </TabPanels>

              </ul>            </TabGroup>

            </div>          </div>

          </div>        </section>



          <div className="border-t border-gray-800 mt-12 pt-8 text-center">        {/* Features */}

            <Text>        <section className="py-20 bg-accent/50">

              © 2025 KK Exchange. Tüm hakları saklıdır.          <div className="container px-4 md:px-6">

            </Text>            <div className="grid gap-12 lg:grid-cols-3">

          </div>              <div className="space-y-4">

        </div>                <div className="inline-block p-3 rounded-lg bg-primary/10">

      </footer>                  <Icons.ChartLine className="w-6 h-6 text-primary" />

    </main>                </div>

  )                <h3 className="text-xl font-bold">Gelişmiş Grafikler</h3>

}                <p className="text-muted-foreground">
                  TradingView entegrasyonu ile profesyonel analiz araçları ve teknik indikatörler
                </p>
              </div>
              <div className="space-y-4">
                <div className="inline-block p-3 rounded-lg bg-primary/10">
                  <Icons.Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Güvenli İşlemler</h3>
                <p className="text-muted-foreground">
                  2FA, soğuk cüzdan ve gelişmiş güvenlik protokolleri ile varlıklarınız güvende
                </p>
              </div>
              <div className="space-y-4">
                <div className="inline-block p-3 rounded-lg bg-primary/10">
                  <Icons.Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Hızlı İşlemler</h3>
                <p className="text-muted-foreground">
                  Yüksek performanslı eşleştirme motoru ile milisaniyeler içinde işlem gerçekleştirin
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
}