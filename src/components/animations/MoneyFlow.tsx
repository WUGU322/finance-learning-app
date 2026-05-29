import { useState, useEffect } from 'react'

export default function MoneyFlow() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setStep(s => (s + 1) % 4)
    }, 1500)
    return () => clearInterval(timer)
  }, [])

  const flows = [
    { from: '💼 工资', to: '🏦 账户', emoji: '💵', label: '收入进账' },
    { from: '🏦 账户', to: '💰 储蓄', emoji: '➡️', label: '先付给自己' },
    { from: '🏦 账户', to: '🏠 支出', emoji: '➡️', label: '再安排支出' },
    { from: '💰 储蓄', to: '📈 投资', emoji: '🚀', label: '钱生钱' },
  ]

  return (
    <div style={{ background: '#f5f0ff', borderRadius: 16, padding: 20, margin: '16px 0' }}>
      <div style={{ textAlign: 'center', fontSize: 13, color: '#666', marginBottom: 16 }}>
        资金流动路径
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {flows.map((flow, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '10px 12px', borderRadius: 10,
            background: step === i ? '#ede7ff' : '#fff',
            border: step === i ? '2px solid #722ed1' : '2px solid transparent',
            transition: 'all 0.4s ease',
            transform: step === i ? 'scale(1.02)' : 'scale(1)',
          }}>
            <span style={{ fontSize: 20, minWidth: 70 }}>{flow.from}</span>
            <span style={{
              fontSize: 18,
              animation: step === i ? 'bounce 0.6s infinite alternate' : 'none',
            }}>{flow.emoji}</span>
            <span style={{ fontSize: 20, minWidth: 70 }}>{flow.to}</span>
            <span style={{ fontSize: 12, color: '#722ed1', fontWeight: step === i ? 700 : 400, marginLeft: 'auto' }}>
              {flow.label}
            </span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes bounce {
          from { transform: translateX(-3px); }
          to { transform: translateX(3px); }
        }
      `}</style>
    </div>
  )
}
