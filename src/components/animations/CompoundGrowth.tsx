import { useState, useEffect } from 'react'

export default function CompoundGrowth() {
  const [year, setYear] = useState(0)
  const principal = 10000
  const rate = 0.05
  const maxYears = 20

  useEffect(() => {
    const timer = setInterval(() => {
      setYear(y => (y >= maxYears ? 0 : y + 1))
    }, 800)
    return () => clearInterval(timer)
  }, [])

  const simpleAmount = principal + principal * rate * year
  const compoundAmount = principal * Math.pow(1 + rate, year)

  const maxVal = principal * Math.pow(1 + rate, maxYears)
  const simpleHeight = (simpleAmount / maxVal) * 160
  const compoundHeight = (compoundAmount / maxVal) * 160

  return (
    <div style={{ background: '#f8faff', borderRadius: 16, padding: 20, margin: '16px 0' }}>
      <div style={{ textAlign: 'center', fontSize: 13, color: '#666', marginBottom: 8 }}>
        本金 1万元 · 年利率 5% · 第 <span style={{ color: '#1677ff', fontWeight: 700, fontSize: 18 }}>{year}</span> 年
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 40, height: 200, padding: '0 20px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 12, color: '#ff6b35', fontWeight: 600, marginBottom: 4 }}>
            ¥{Math.round(simpleAmount).toLocaleString()}
          </div>
          <div style={{
            width: 50, height: simpleHeight, background: 'linear-gradient(180deg, #ff9a76, #ff6b35)',
            borderRadius: '8px 8px 0 0', transition: 'height 0.6s ease',
          }} />
          <div style={{ fontSize: 11, marginTop: 6, color: '#666' }}>单利</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 12, color: '#1677ff', fontWeight: 600, marginBottom: 4 }}>
            ¥{Math.round(compoundAmount).toLocaleString()}
          </div>
          <div style={{
            width: 50, height: compoundHeight, background: 'linear-gradient(180deg, #69b1ff, #1677ff)',
            borderRadius: '8px 8px 0 0', transition: 'height 0.6s ease',
          }} />
          <div style={{ fontSize: 11, marginTop: 6, color: '#666' }}>复利</div>
        </div>
      </div>
      <div style={{ textAlign: 'center', fontSize: 12, color: '#999', marginTop: 8 }}>
        差额：<span style={{ color: '#1677ff', fontWeight: 600 }}>¥{Math.round(compoundAmount - simpleAmount).toLocaleString()}</span>
        {year >= 10 && <span> — 时间越长差距越大！</span>}
      </div>
    </div>
  )
}
