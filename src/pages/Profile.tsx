import { useProgress } from '../context/ProgressContext'
import { modules } from '../data/courses'
import { ProgressBar } from 'antd-mobile'

const allAchievements = [
  { id: 'quiz-basics', name: '基础达人', desc: '通过理财基础测验（80分以上）', icon: '🏅' },
  { id: 'quiz-savings', name: '储蓄专家', desc: '通过储蓄规划测验（80分以上）', icon: '💎' },
  { id: 'quiz-investment', name: '投资新星', desc: '通过投资入门测验（80分以上）', icon: '⭐' },
  { id: 'quiz-risk', name: '风控达人', desc: '通过风险管理测验（80分以上）', icon: '🛡️' },
]

export default function Profile() {
  const { progress } = useProgress()

  const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0)
  const completedCount = progress.completedLessons.length
  const overallProgress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0

  return (
    <div className="page">
      <h1 className="page-title">个人中心</h1>

      <div className="card" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 8 }}>🎓</div>
        <div style={{ fontWeight: 700, fontSize: 18 }}>理财学习者</div>
        <div style={{ fontSize: 13, color: '#666', marginTop: 4 }}>
          已学习 {completedCount} 节课程
        </div>
      </div>

      <h2 style={{ fontSize: 16, margin: '20px 0 12px' }}>学习统计</h2>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 16 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#1677ff' }}>{completedCount}</div>
            <div style={{ fontSize: 12, color: '#999' }}>已学课程</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#52c41a' }}>{Object.keys(progress.quizScores).length}</div>
            <div style={{ fontSize: 12, color: '#999' }}>已完成测验</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#faad14' }}>{progress.achievements.length}</div>
            <div style={{ fontSize: 12, color: '#999' }}>获得成就</div>
          </div>
        </div>
        <div style={{ fontSize: 13, color: '#666', marginBottom: 6 }}>总体进度</div>
        <ProgressBar percent={overallProgress} style={{ '--track-width': '8px' }} />
        <div style={{ fontSize: 12, color: '#999', marginTop: 4 }}>{overallProgress}% 完成</div>
      </div>

      <h2 style={{ fontSize: 16, margin: '20px 0 12px' }}>测验成绩</h2>
      <div className="card">
        {modules.filter(m => m.id !== 'practice').map(module => {
          const score = progress.quizScores[module.id]
          return (
            <div key={module.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f5f5f5' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>{module.icon}</span>
                <span style={{ fontSize: 14 }}>{module.title}</span>
              </div>
              <span style={{ fontSize: 14, color: score != null ? (score >= 80 ? '#52c41a' : '#faad14') : '#ccc' }}>
                {score != null ? `${score}分` : '未测验'}
              </span>
            </div>
          )
        })}
      </div>

      <h2 style={{ fontSize: 16, margin: '20px 0 12px' }}>成就徽章</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {allAchievements.map(a => {
          const unlocked = progress.achievements.includes(a.id)
          return (
            <div key={a.id} className="card" style={{ textAlign: 'center', opacity: unlocked ? 1 : 0.4 }}>
              <div style={{ fontSize: 32 }}>{a.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4 }}>{a.name}</div>
              <div style={{ fontSize: 11, color: '#999', marginTop: 2 }}>{a.desc}</div>
              {unlocked && <div style={{ fontSize: 11, color: '#52c41a', marginTop: 4 }}>已解锁</div>}
            </div>
          )
        })}
      </div>
    </div>
  )
}
