import { useState, useEffect } from 'react'

export default function RiskRewardDemo() {
  const [selected, setSelected] = useState<number | null>(null)
  const [results, setResults] = useState<number[]>([])

  const products = [
    { name: '银行存款', risk: 1, expectedReturn: 2, color: '#52c41a', emoji: '🏦' },
    { name: '债券基金', risk: 2, expectedReturn: 5, color: '#1677ff', emoji: '📄' },
    { name: '指数基金', risk: 4, expectedReturn: 8, color: '#faad14', emoji: '📊' },
    { name: '个股', risk: 5, expectedReturn: 12, color: '#ff4d4f', emoji: '📈' },
  ]

  useEffect(() => {
    if (selected === null) return
    const product = products[selected]
    const timer = setInterval(() => {
      const randomReturn = product.expectedReturn + (Math.random() - 0.5) * product.risk * 6
      setResults(prev => [...prev.slice(-9), randomReturn])
    }, 500)
    return () => clearInterval(timer)
  }, [selected])

  return (
    <div style={{ background: '#fff5f5', borderRadius: 16, padding: 20, margin: '16px 0' }}>
      <div style={{ textAlign: 'center', fontSize: 13, color: '#666', marginBottom: 12 }}>
        点击体验不同产品的收益波动
      </div>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 16 }}>
        {products.map((p, i) => (
          <div key={i} onClick={() => { setSelected(i); setResults([]) }} style={{
            padding: '8px 12px', borderRadius: 8, cursor: 'pointer',
            background: selected === i ? p.color : '#fff',
            color: selected === i ? '#fff' : '#333',
            border: `2px solid ${p.color}`, fontSize: 12, fontWeight: 600,
            transition: 'all 0.3s',
          }}>
            {p.emoji} {p.name}
          </div>
        ))}
      </div>

      {selected !== null && (
        <div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 4, height: 100 }}>
            {results.map((r, i) => (
              <div key={i} style={{
                width: 20, borderRadius: '4px 4px 0 0',
                height: Math.abs(r) * 3 + 10,
                background: r >= 0 ? '#52c41a' : '#ff4d4f',
                transition: 'height 0.3s',
                display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
                paddingTop: 2, fontSize: 9, color: '#fff', fontWeight: 600,
              }}>
                {r.toFixed(0)}%
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 8, fontSize: 12, color: '#666' }}>
            风险等级：{'⚡'.repeat(products[selected].risk)} · 预期年化：{products[selected].expectedReturn}%
          </div>
        </div>
      )}

      {selected === null && (
        <div style={{ textAlign: 'center', color: '#999', fontSize: 13, padding: 20 }}>
          👆 选择一个产品看看收益波动
        </div>
      )}
    </div>
  )
}
