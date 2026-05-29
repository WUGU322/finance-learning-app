import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input, Button, Slider } from 'antd-mobile'

export default function CompoundCalculator() {
  const navigate = useNavigate()
  const [principal, setPrincipal] = useState('10000')
  const [rate, setRate] = useState(7)
  const [years, setYears] = useState('10')
  const [monthlyAdd, setMonthlyAdd] = useState('1000')
  const [result, setResult] = useState<{ total: number; interest: number; invested: number } | null>(null)

  const calculate = () => {
    const p = parseFloat(principal) || 0
    const r = rate / 100
    const y = parseInt(years) || 0
    const m = parseFloat(monthlyAdd) || 0

    let total = p
    const monthlyRate = r / 12
    const totalMonths = y * 12

    for (let i = 0; i < totalMonths; i++) {
      total = total * (1 + monthlyRate) + m
    }

    const invested = p + m * totalMonths
    setResult({ total: Math.round(total), interest: Math.round(total - invested), invested: Math.round(invested) })
  }

  return (
    <div className="page">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
        <span onClick={() => navigate(-1)} style={{ cursor: 'pointer', fontSize: 20 }}>←</span>
        <span style={{ fontSize: 16, fontWeight: 600 }}>复利计算器</span>
      </div>

      <div className="card">
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, color: '#666', display: 'block', marginBottom: 6 }}>初始本金（元）</label>
          <Input type="number" value={principal} onChange={setPrincipal} placeholder="输入初始本金" style={{ '--font-size': '16px' }} />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, color: '#666', display: 'block', marginBottom: 6 }}>
            年化收益率：{rate}%
          </label>
          <Slider value={rate} onChange={v => setRate(v as number)} min={1} max={20} step={0.5} />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, color: '#666', display: 'block', marginBottom: 6 }}>投资年限（年）</label>
          <Input type="number" value={years} onChange={setYears} placeholder="输入年限" style={{ '--font-size': '16px' }} />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, color: '#666', display: 'block', marginBottom: 6 }}>每月定投（元）</label>
          <Input type="number" value={monthlyAdd} onChange={setMonthlyAdd} placeholder="每月追加投入" style={{ '--font-size': '16px' }} />
        </div>

        <Button block color="primary" size="large" onClick={calculate}>计算</Button>
      </div>

      {result && (
        <div className="card" style={{ marginTop: 16 }}>
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <div style={{ fontSize: 13, color: '#666' }}>最终总额</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#1677ff' }}>
              ¥{result.total.toLocaleString()}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 12, color: '#999' }}>累计投入</div>
              <div style={{ fontSize: 16, fontWeight: 600 }}>¥{result.invested.toLocaleString()}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 12, color: '#999' }}>收益</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: '#52c41a' }}>¥{result.interest.toLocaleString()}</div>
            </div>
          </div>
          <div style={{ marginTop: 16, padding: 12, background: '#f0f7ff', borderRadius: 8, fontSize: 13, color: '#666' }}>
            复利的威力：你投入了 ¥{result.invested.toLocaleString()}，但最终获得了 ¥{result.total.toLocaleString()}，
            收益是投入的 {(result.interest / result.invested * 100).toFixed(0)}%！时间越长，复利效应越明显。
          </div>
        </div>
      )}
    </div>
  )
}
