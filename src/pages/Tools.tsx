import { useNavigate } from 'react-router-dom'

const tools = [
  { path: '/tools/compound', icon: '🧮', title: '复利计算器', desc: '计算复利增长，感受时间的力量' },
  { path: '/tools/savings', icon: '🎯', title: '储蓄目标计算器', desc: '规划储蓄目标，计算每月需存金额' },
  { path: '/tools/risk', icon: '📋', title: '风险评估问卷', desc: '评估你的风险承受能力' },
]

export default function Tools() {
  const navigate = useNavigate()

  return (
    <div className="page">
      <h1 className="page-title">理财工具箱</h1>
      <p style={{ color: '#666', marginBottom: 20, fontSize: 14 }}>
        实用工具帮你更好地规划财务
      </p>

      {tools.map(tool => (
        <div
          key={tool.path}
          className="card"
          onClick={() => navigate(tool.path)}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14 }}
        >
          <div style={{ fontSize: 36 }}>{tool.icon}</div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 16 }}>{tool.title}</div>
            <div style={{ fontSize: 13, color: '#666', marginTop: 4 }}>{tool.desc}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
