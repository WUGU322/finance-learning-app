import { useState } from 'react'
import { Button, Toast } from 'antd-mobile'
import { useProgress } from '../context/ProgressContext'

interface Fund {
  id: string
  name: string
  type: string
  risk: string
  currentPrice: number
  change: number
}

const funds: Fund[] = [
  { id: 'hs300', name: '沪深300指数基金', type: '指数基金', risk: '中', currentPrice: 4.52, change: 0.8 },
  { id: 'bond', name: '稳健债券基金', type: '债券基金', risk: '低', currentPrice: 1.08, change: 0.1 },
  { id: 'tech', name: '科技成长基金', type: '股票基金', risk: '高', currentPrice: 2.35, change: -1.2 },
  { id: 'money', name: '货币市场基金', type: '货币基金', risk: '极低', currentPrice: 1.00, change: 0.01 },
  { id: 'mixed', name: '平衡混合基金', type: '混合基金', risk: '中', currentPrice: 3.18, change: 0.5 },
]

export default function Simulate() {
  const { progress, updateSimulation } = useProgress()
  const [balance, setBalance] = useState(progress.simulationBalance)
  const [portfolio, setPortfolio] = useState<Record<string, number>>(progress.simulationPortfolio)
  const [buyAmount, setBuyAmount] = useState<Record<string, string>>({})

  const handleBuy = (fund: Fund) => {
    const amount = parseFloat(buyAmount[fund.id] || '0')
    if (amount <= 0 || amount > balance) {
      Toast.show({ content: amount > balance ? '余额不足' : '请输入有效金额' })
      return
    }
    const shares = amount / fund.currentPrice
    const newPortfolio = { ...portfolio, [fund.id]: (portfolio[fund.id] || 0) + shares }
    const newBalance = balance - amount
    setPortfolio(newPortfolio)
    setBalance(newBalance)
    updateSimulation(newBalance, newPortfolio)
    setBuyAmount(prev => ({ ...prev, [fund.id]: '' }))
    Toast.show({ content: `成功买入 ${shares.toFixed(2)} 份`, icon: 'success' })
  }

  const handleSell = (fund: Fund) => {
    const shares = portfolio[fund.id] || 0
    if (shares <= 0) {
      Toast.show({ content: '没有持仓' })
      return
    }
    const value = shares * fund.currentPrice
    const newPortfolio = { ...portfolio }
    delete newPortfolio[fund.id]
    const newBalance = balance + value
    setPortfolio(newPortfolio)
    setBalance(newBalance)
    updateSimulation(newBalance, newPortfolio)
    Toast.show({ content: `卖出获得 ¥${value.toFixed(2)}`, icon: 'success' })
  }

  const totalAssets = balance + funds.reduce((sum, f) => sum + (portfolio[f.id] || 0) * f.currentPrice, 0)
  const profit = totalAssets - 100000

  return (
    <div className="page">
      <h1 className="page-title">模拟投资</h1>

      <div className="card" style={{ background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', color: '#fff' }}>
        <div style={{ fontSize: 13, opacity: 0.9 }}>总资产（虚拟）</div>
        <div style={{ fontSize: 26, fontWeight: 700, margin: '4px 0' }}>¥{totalAssets.toFixed(2)}</div>
        <div style={{ display: 'flex', gap: 20, fontSize: 12 }}>
          <span>可用余额：¥{balance.toFixed(2)}</span>
          <span style={{ color: profit >= 0 ? '#fff' : '#ffccc7' }}>
            {profit >= 0 ? '盈利' : '亏损'}：¥{Math.abs(profit).toFixed(2)}
          </span>
        </div>
      </div>

      {Object.keys(portfolio).length > 0 && (
        <>
          <h2 style={{ fontSize: 16, margin: '16px 0 8px' }}>我的持仓</h2>
          {funds.filter(f => portfolio[f.id] > 0).map(fund => (
            <div key={fund.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{fund.name}</div>
                <div style={{ fontSize: 12, color: '#666' }}>
                  {portfolio[fund.id].toFixed(2)} 份 | 市值 ¥{(portfolio[fund.id] * fund.currentPrice).toFixed(2)}
                </div>
              </div>
              <Button size="small" color="danger" onClick={() => handleSell(fund)}>卖出</Button>
            </div>
          ))}
        </>
      )}

      <h2 style={{ fontSize: 16, margin: '16px 0 8px' }}>基金市场</h2>
      {funds.map(fund => (
        <div key={fund.id} className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{fund.name}</div>
              <div style={{ fontSize: 12, color: '#999' }}>{fund.type} | 风险：{fund.risk}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 600 }}>¥{fund.currentPrice.toFixed(2)}</div>
              <div style={{ fontSize: 12, color: fund.change >= 0 ? '#52c41a' : '#ff4d4f' }}>
                {fund.change >= 0 ? '+' : ''}{fund.change}%
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              type="number"
              placeholder="输入金额"
              value={buyAmount[fund.id] || ''}
              onChange={e => setBuyAmount(prev => ({ ...prev, [fund.id]: e.target.value }))}
              style={{ flex: 1, padding: '8px 12px', border: '1px solid #eee', borderRadius: 6, fontSize: 14 }}
            />
            <Button size="small" color="primary" onClick={() => handleBuy(fund)}>买入</Button>
          </div>
        </div>
      ))}

      <div className="card" style={{ background: '#fff8e6', marginTop: 8 }}>
        <div style={{ fontSize: 13, color: '#8c6900' }}>
          这是模拟投资，使用虚拟资金（初始10万元）。目的是让你体验投资流程，不涉及真实资金。
        </div>
      </div>
    </div>
  )
}
