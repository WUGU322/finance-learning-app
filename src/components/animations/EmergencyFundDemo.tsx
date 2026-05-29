import { useState, useEffect } from 'react'

export default function EmergencyFundDemo() {
  const [monthlyExpense, setMonthlyExpense] = useState(5000)
  const [months, setMonths] = useState(0)
  const target = monthlyExpense * 6

  useEffect(() => {
    if (months >= 6) return
    const timer = setInterval(() => {
      setMonths(m => Math.min(m + 1, 6))
    }, 800)
    return () => clearInterval(timer)
  }, [months])

  const saved = monthlyExpense * months
  const percent = (saved / target) * 100

  return (
    <div style={{ background: '#f0fff4', borderRadius: 16, padding: 20, margin: '16px 0' }}>
      <div style={{ textAlign: 'center', fontSize: 13, color: '#666', marginBottom: 12 }}>
        紧急备用金 = 6个月生活费
      </div>
      <div style={{ textAlign: 'center', marginBottom: 12 }}>
        <span style={{ fontSize: 12, color: '#999' }}>月支出：</span>
        <input type="range" min={2000} max={15000} step={500} value={monthlyExpense}
          onChange={e => { setMonthlyExpense(Number(e.target.value)); setMonths(0) }}
          style={{ width: 120, verticalAlign: 'middle', margin: '0 8px' }}
        />
        <span style={{ fontWeight: 700, color: '#52c41a' }}>¥{monthlyExpense.toLocaleString()}</span>
      </div>

      <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 12 }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} style={{
            width: 40, height: 50, borderRadius: 8,
            background: i < months ? 'linear-gradient(180deg, #95de64, #52c41a)' : '#e8e8e8',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, transition: 'all 0.5s ease',
            transform: i < months ? 'translateY(-4px)' : 'translateY(0)',
            boxShadow: i < months ? '0 4px 8px rgba(82,196,26,0.3)' : 'none',
          }}>
            {i < months ? '🛡️' : '○'}
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 11, color: '#999', marginBottom: 4 }}>目标：¥{target.toLocaleString()}</div>
        <div style={{
          height: 10, background: '#e8e8e8', borderRadius: 5, overflow: 'hidden', margin: '0 20px',
        }}>
          <div style={{
            height: '100%', width: `${percent}%`,
            background: 'linear-gradient(90deg, #95de64, #52c41a)',
            borderRadius: 5, transition: 'width 0.6s ease',
          }} />
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#52c41a', marginTop: 6 }}>
          已储备 {months} 个月 · ¥{saved.toLocaleString()}
        </div>
      </div>
    </div>
  )
}
