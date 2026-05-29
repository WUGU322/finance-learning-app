import { useNavigate } from 'react-router-dom'
import { ProgressBar } from 'antd-mobile'
import { useProgress } from '../context/ProgressContext'
import { modules } from '../data/courses'

export default function Home() {
  const navigate = useNavigate()
  const { progress, getModuleProgress } = useProgress()

  const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0)
  const completedCount = progress.completedLessons.length
  const overallProgress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0

  return (
    <div className="page">
      <h1 className="page-title">理财学习</h1>

      <div className="card" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff' }}>
        <div style={{ marginBottom: 8, fontSize: 14, opacity: 0.9 }}>学习进度</div>
        <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>{overallProgress}%</div>
        <ProgressBar percent={overallProgress} style={{ '--fill-color': '#fff', '--track-color': 'rgba(255,255,255,0.3)', '--track-width': '8px' }} />
        <div style={{ marginTop: 8, fontSize: 12, opacity: 0.8 }}>
          已完成 {completedCount}/{totalLessons} 节课程
        </div>
      </div>

      <h2 style={{ fontSize: 18, margin: '20px 0 12px' }}>继续学习</h2>

      {modules.map(module => {
        const moduleProgress = getModuleProgress(module.id, module.lessons.length)
        return (
          <div
            key={module.id}
            className="card"
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12 }}
            onClick={() => navigate('/courses')}
          >
            <div style={{ fontSize: 32 }}>{module.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>{module.title}</div>
              <div style={{ fontSize: 12, color: '#666', marginBottom: 6 }}>{module.description}</div>
              <ProgressBar percent={moduleProgress} style={{ '--track-width': '6px' }} />
            </div>
            <div style={{ fontSize: 12, color: '#999' }}>{moduleProgress}%</div>
          </div>
        )
      })}

      <h2 style={{ fontSize: 18, margin: '20px 0 12px' }}>快捷工具</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div className="card" style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => navigate('/market')}>
          <div style={{ fontSize: 28 }}>📈</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>实时行情</div>
        </div>
        <div className="card" style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => navigate('/tools/compound')}>
          <div style={{ fontSize: 28 }}>🧮</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>复利计算器</div>
        </div>
        <div className="card" style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => navigate('/tools/risk')}>
          <div style={{ fontSize: 28 }}>📋</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>风险评估</div>
        </div>
        <div className="card" style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => navigate('/simulate')}>
          <div style={{ fontSize: 28 }}>💰</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>模拟投资</div>
        </div>
      </div>
    </div>
  )
}
