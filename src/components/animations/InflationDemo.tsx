import { useState, useEffect } from 'react'

export default function InflationDemo() {
  const [years, setYears] = useState(0)
  const inflationRate = 0.03
  const maxYears = 30

  useEffect(() => {
    const timer = setInterval(() => {
      setYears(y => (y >= maxYears ? 0 : y + 1))
    }, 600)
    return () => clearInterval(timer)
  }, [])

  const purchasingPower = 100 * Math.pow(1 - inflationRate, years)
  const items = Math.floor(purchasingPower / 10)

  return (
    <div style={{ background: '#fff9f0', borderRadius: 16, padding: 20, margin: '16px 0' }}>
      <div style={{ textAlign: 'center', fontSize: 13, color: '#666', marginBottom: 12 }}>
        通胀率 3% · <span style={{ fontWeight: 700, color: '#fa8c16' }}>{years}年后</span> · 100元的购买力
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 80 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center', maxWidth: 240 }}>
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} style={{
              width: 36, height: 36, borderRadius: 8,
              background: i < items ? '#52c41a' : '#f0f0f0',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, transition: 'all 0.4s ease',
              opacity: i < items ? 1 : 0.3,
              transform: i < items ? 'scale(1)' : 'scale(0.8)',
            }}>
              🍎
            </div>
          ))}
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: 12 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#fa8c16' }}>
          ¥{purchasingPower.toFixed(1)}
        </div>
        <div style={{ fontSize: 11, color: '#999', marginTop: 4 }}>
          100元只能买到原来 {purchasingPower.toFixed(0)}% 的东西
        </div>
      </div>
    </div>
  )
}
