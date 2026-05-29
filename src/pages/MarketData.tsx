import { PullToRefresh, Card, SpinLoading } from 'antd-mobile'
import { useMarketData } from '../hooks/useMarketData'

export default function MarketData() {
  const { funds, stocks, loading, refresh } = useMarketData()

  return (
    <PullToRefresh onRefresh={async () => { refresh() }}>
      <div className="page">
        <h1 className="page-title">实时行情</h1>
        <p style={{ color: '#666', marginBottom: 20, fontSize: 13 }}>
          数据每分钟自动更新 · 下拉刷新
        </p>

        {loading && <div style={{ textAlign: 'center', padding: 20 }}><SpinLoading /></div>}

        <h2 style={{ fontSize: 16, margin: '16px 0 12px' }}>热门基金</h2>
        {funds.map(fund => (
          <Card key={fund.code} style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{fund.name}</div>
                <div style={{ fontSize: 12, color: '#999', marginTop: 2 }}>{fund.code}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 18, fontWeight: 700 }}>¥{fund.netValue}</div>
                <div style={{
                  fontSize: 13,
                  color: parseFloat(fund.dayGrowth) >= 0 ? '#52c41a' : '#ff4d4f',
                  marginTop: 2
                }}>
                  {parseFloat(fund.dayGrowth) >= 0 ? '+' : ''}{fund.dayGrowth}%
                </div>
              </div>
            </div>
            <div style={{ fontSize: 11, color: '#999', marginTop: 8 }}>
              更新时间：{fund.updateTime}
            </div>
          </Card>
        ))}

        <h2 style={{ fontSize: 16, margin: '20px 0 12px' }}>股票指数</h2>
        {stocks.map(stock => (
          <Card key={stock.code} style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{stock.name}</div>
                <div style={{ fontSize: 12, color: '#999', marginTop: 2 }}>{stock.code}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 18, fontWeight: 700 }}>{stock.price}</div>
                <div style={{
                  fontSize: 13,
                  color: parseFloat(stock.change) >= 0 ? '#52c41a' : '#ff4d4f',
                  marginTop: 2
                }}>
                  {parseFloat(stock.change) >= 0 ? '+' : ''}{stock.change} ({parseFloat(stock.changePercent) >= 0 ? '+' : ''}{stock.changePercent}%)
                </div>
              </div>
            </div>
          </Card>
        ))}

        <div className="card" style={{ background: '#fff8e6', marginTop: 16 }}>
          <div style={{ fontSize: 13, color: '#8c6900' }}>
            💡 数据来源于公开API，仅供学习参考，不构成投资建议。实际交易请以官方数据为准。
          </div>
        </div>
      </div>
    </PullToRefresh>
  )
}
