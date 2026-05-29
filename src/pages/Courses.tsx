import { useNavigate } from 'react-router-dom'
import { ProgressBar } from 'antd-mobile'
import { useProgress } from '../context/ProgressContext'
import { modules } from '../data/courses'

export default function Courses() {
  const navigate = useNavigate()
  const { progress, getModuleProgress } = useProgress()

  return (
    <div className="page">
      <h1 className="page-title">全部课程</h1>
      <p style={{ color: '#666', marginBottom: 20, fontSize: 14 }}>
        从基础到实践，系统学习理财知识
      </p>

      {modules.map((module, index) => {
        const moduleProgress = getModuleProgress(module.id, module.lessons.length)
        const completedInModule = progress.completedLessons.filter(id => id.startsWith(module.id)).length

        return (
          <div key={module.id} className="card" style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{ fontSize: 36 }}>{module.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: '#999' }}>模块 {index + 1}</div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{module.title}</div>
                <div style={{ fontSize: 12, color: '#666', marginTop: 2 }}>{module.description}</div>
              </div>
            </div>

            <ProgressBar percent={moduleProgress} style={{ '--track-width': '6px', marginBottom: 12 }} />
            <div style={{ fontSize: 12, color: '#999', marginBottom: 12 }}>
              {completedInModule}/{module.lessons.length} 节已完成
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {module.lessons.map((lesson, li) => {
                const isCompleted = progress.completedLessons.includes(lesson.id)
                return (
                  <div
                    key={lesson.id}
                    onClick={() => navigate(`/courses/${lesson.id}`)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '10px 12px',
                      background: isCompleted ? '#f0f9f0' : '#f8f8f8',
                      borderRadius: 8,
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{
                      width: 24, height: 24, borderRadius: '50%',
                      background: isCompleted ? '#52c41a' : '#ddd',
                      color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 12, fontWeight: 600,
                    }}>
                      {isCompleted ? '✓' : li + 1}
                    </div>
                    <div style={{ flex: 1, fontSize: 14 }}>{lesson.title}</div>
                    <div style={{ fontSize: 12, color: '#999' }}>{isCompleted ? '已学' : '未学'}</div>
                  </div>
                )
              })}
            </div>

            {moduleProgress === 100 && (
              <div
                onClick={() => navigate(`/quiz/${module.id}`)}
                style={{
                  marginTop: 12, padding: '10px', textAlign: 'center',
                  background: '#1677ff', color: '#fff', borderRadius: 8,
                  cursor: 'pointer', fontWeight: 600, fontSize: 14,
                }}
              >
                参加测验
              </div>
            )}
            {moduleProgress > 0 && moduleProgress < 100 && (
              <div style={{ marginTop: 12, padding: '10px', textAlign: 'center', color: '#999', fontSize: 13 }}>
                完成所有课程后解锁测验
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
