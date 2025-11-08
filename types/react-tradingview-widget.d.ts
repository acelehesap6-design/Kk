declare module 'react-tradingview-widget' {
  interface TradingViewWidgetProps {
    symbol?: string
    theme?: string
    autosize?: boolean
    interval?: string
    timezone?: string
    style?: string
    locale?: string
    toolbar_bg?: string
    enable_publishing?: boolean
    allow_symbol_change?: boolean
    container_id?: string
    width?: string | number
    height?: string | number
  }

  export default function TradingViewWidget(props: TradingViewWidgetProps): JSX.Element
}