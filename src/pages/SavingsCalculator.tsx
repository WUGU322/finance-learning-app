import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input, Button } from 'antd-mobile'

export default function SavingsCalculator() {
  const navigate = useNavigate()
  const [goal, setGoal] = useState('50000')
  const [months, setMonths] = useState('24')
  const [current, setCurrent] = useState('5000')
  const [result, setResult] = useState<{ monthly: number; daily: number } | null>(null)

  const calculate = () => {
    const g = parseFloat(goal) || 0
    const m = parseInt(months) || 1
    const c = parseFloat(current) || 0
    const remaining = g - c
    const monthly = Math.ceil(remaining / m)
    const daily = Math.ceil(remaining / (m * 30))
    setResult({ monthly, daily })
  }

  return (
    <div className="page">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
        <span onClick={() => navigate(-1)} style={{ cursor: 'pointer', fontSize: 20 }}>←</span>
        <span style={{ fontSize: 16, fontWeight: 600 }}>储蓄目标计算器</span>
      </div>

      <div className="card">
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, color: '#666', display: 'block', marginBottom: 6 }}>目标金额（元）</label>
          <Input type="number" value={goal} onChange={setGoal} placeholder="你想存多少钱" style={{ '--font-size': '16px' }} />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, color: '#666', display: 'block', marginBottom: 6 }}>目标期限（月）</label>
          <Input type="number" value={months} onChange={setMonths} placeholder="几个月内达成" style={{ '--font-size': '16px' }} />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, color: '#666', display: 'block', marginBottom: 6 }}>已有存款（元）</label>
          <Input type="number" value={current} onChange={setCurrent} placeholder="目前已经存了多少" style={{ '--font-size': '16px' }} />
        </div>

        <Button block color="primary" size="large" onClick={calculate}>计算</Button>
      </div>

      {result && (
        <div className="card" style={{ marginTop: 16 }}>
          <div style={{ textAlign: 'center', marginBottom: 12 }}>
            <div style={{ fontSize: 13, color: '#666' }}>每月需要存</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#1677ff' }}>
              ¥{result.monthly.toLocaleString()}
            </div>
          </div>
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <div style={{ fontSize: 13, color: '#666' }}>相当于每天存</div>
            <div style={{ fontSize: 20, fontWeight: 600 }}>¥{result.daily}</div>
          </div>
          <div style={{ padding: 12, background: '#f0fff0', borderRadius: 8, fontSize: 13, color: '#666' }}>
            小贴士：把每月储蓄金额设为自动转账，发工资当天自动转入储蓄账户，这样更容易坚持！
          </div>
        </div>
      )}
    </div>
  )
}
