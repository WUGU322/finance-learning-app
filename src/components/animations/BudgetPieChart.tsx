import { useState } from 'react'

export default function BudgetPieChart() {
  const [salary, setSalary] = useState(8000)
  const segments = [
    { label: '必要支出', percent: 50, color: '#1677ff', emoji: '🏠' },
    { label: '个人消费', percent: 30, color: '#52c41a', emoji: '🎮' },
    { label: '储蓄投资', percent: 20, color: '#faad14', emoji: '💰' },
  ]

  const radius = 70
  const cx = 90
  const cy = 90
  let cumulativePercent = 0

  const getCoordinatesForPercent = (percent: number) => {
    const x = cx + radius * Math.cos(2 * Math.PI * percent - Math.PI / 2)
    const y = cy + radius * Math.sin(2 * Math.PI * percent - Math.PI / 2)
    return [x, y]
  }

  return (
    <div style={{ background: '#f0f7ff', borderRadius: 16, padding: 20, margin: '16px 0' }}>
      <div style={{ textAlign: 'center', fontSize: 13, color: '#666', marginBottom: 4 }}>
        50/30/20 法则
      </div>
      <div style={{ textAlign: 'center', marginBottom: 12 }}>
        <span style={{ fontSize: 12, color: '#999' }}>月薪：</span>
        <input
          type="range" min={3000} max={30000} step={500} value={salary}
          onChange={e => setSalary(Number(e.target.value))}
          style={{ width: 120, verticalAlign: 'middle', margin: '0 8px' }}
        />
        <span style={{ fontWeight: 700, color: '#1677ff' }}>¥{salary.toLocaleString()}</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
        <svg width={180} height={180} viewBox="0 0 180 180">
          {segments.map((seg) => {
            const startPercent = cumulativePercent
            cumulativePercent += seg.percent / 100
            const [startX, startY] = getCoordinatesForPercent(startPercent)
            const [endX, endY] = getCoordinatesForPercent(cumulativePercent)
            const largeArcFlag = seg.percent > 50 ? 1 : 0
            const pathData = [
              `M ${cx} ${cy}`,
              `L ${startX} ${startY}`,
              `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
              'Z',
            ].join(' ')
            return <path key={seg.label} d={pathData} fill={seg.color} opacity={0.85} />
          })}
          <circle cx={cx} cy={cy} r={30} fill="#fff" />
          <text x={cx} y={cy + 5} textAnchor="middle" fontSize={11} fill="#333" fontWeight="600">预算</text>
        </svg>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {segments.map(seg => (
            <div key={seg.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 18 }}>{seg.emoji}</span>
              <div>
                <div style={{ fontSize: 12, color: '#666' }}>{seg.label} {seg.percent}%</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: seg.color }}>
                  ¥{Math.round(salary * seg.percent / 100).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
