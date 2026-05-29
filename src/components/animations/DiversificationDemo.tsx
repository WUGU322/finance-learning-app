import { useState, useEffect } from 'react'

export default function DiversificationDemo() {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setTick(t => t + 1), 1000)
    return () => clearInterval(timer)
  }, [])

  const singleEgg = Math.random() > 0.7
  const baskets = [
    { broken: Math.sin(tick * 0.5) < -0.8, label: '存款' },
    { broken: Math.cos(tick * 0.7) < -0.8, label: '债券' },
    { broken: Math.sin(tick * 0.3 + 1) < -0.8, label: '基金' },
    { broken: Math.cos(tick * 0.4 + 2) < -0.8, label: '股票' },
  ]

  const allInOneLost = singleEgg
  const diversifiedLost = baskets.filter(b => b.broken).length

  return (
    <div style={{ background: '#fffbf0', borderRadius: 16, padding: 20, margin: '16px 0' }}>
      <div style={{ textAlign: 'center', fontSize: 13, color: '#666', marginBottom: 16 }}>
        不要把所有鸡蛋放在一个篮子里
      </div>

      <div style={{ display: 'flex', gap: 20, justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: '#999', marginBottom: 8 }}>集中投资</div>
          <div style={{
            width: 80, height: 80, borderRadius: 12,
            background: allInOneLost ? '#fff1f0' : '#f6ffed',
            border: `2px solid ${allInOneLost ? '#ff4d4f' : '#52c41a'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 30, transition: 'all 0.3s',
          }}>
            {allInOneLost ? '💔' : '🥚🥚🥚'}
          </div>
          <div style={{ fontSize: 11, marginTop: 6, color: allInOneLost ? '#ff4d4f' : '#52c41a', fontWeight: 600 }}>
            {allInOneLost ? '全部损失！' : '暂时安全'}
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: '#999', marginBottom: 8 }}>分散投资</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
            {baskets.map((b, i) => (
              <div key={i} style={{
                width: 38, height: 38, borderRadius: 8,
                background: b.broken ? '#fff1f0' : '#f6ffed',
                border: `1px solid ${b.broken ? '#ff4d4f' : '#52c41a'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16, transition: 'all 0.3s',
              }}>
                {b.broken ? '💔' : '🥚'}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 11, marginTop: 6, color: '#52c41a', fontWeight: 600 }}>
            损失 {diversifiedLost}/4 篮
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: 12, fontSize: 12, color: '#666' }}>
        分散投资不能消除风险，但能大幅降低全部损失的概率
      </div>
    </div>
  )
}
