import { useParams, useNavigate } from 'react-router-dom'
import { Button } from 'antd-mobile'
import { useProgress } from '../context/ProgressContext'
import { modules } from '../data/courses'
import CompoundGrowth from '../components/animations/CompoundGrowth'
import InflationDemo from '../components/animations/InflationDemo'
import BudgetPieChart from '../components/animations/BudgetPieChart'
import AssetLiabilityScale from '../components/animations/AssetLiabilityScale'
import MoneyFlow from '../components/animations/MoneyFlow'
import RiskRewardDemo from '../components/animations/RiskRewardDemo'
import EmergencyFundDemo from '../components/animations/EmergencyFundDemo'
import DiversificationDemo from '../components/animations/DiversificationDemo'
import { type ReactNode } from 'react'

const lessonAnimations: Record<string, ReactNode> = {
  'basics-2': <MoneyFlow />,
  'basics-3': <AssetLiabilityScale />,
  'basics-4': <CompoundGrowth />,
  'basics-5': <InflationDemo />,
  'savings-1': <EmergencyFundDemo />,
  'savings-3': <BudgetPieChart />,
  'investment-3': <RiskRewardDemo />,
  'investment-4': <DiversificationDemo />,
}

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { progress, completeLesson } = useProgress()

  const lesson = modules.flatMap(m => m.lessons).find(l => l.id === id)
  if (!lesson) {
    return <div className="page"><p>课程未找到</p></div>
  }

  const module = modules.find(m => m.lessons.some(l => l.id === id))!
  const lessonIndex = module.lessons.findIndex(l => l.id === id)
  const nextLesson = module.lessons[lessonIndex + 1]
  const isCompleted = progress.completedLessons.includes(lesson.id)
  const animation = lessonAnimations[lesson.id]

  const handleComplete = () => {
    completeLesson(lesson.id)
  }

  return (
    <div className="page" style={{ paddingBottom: 100 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <span onClick={() => navigate(-1)} style={{ cursor: 'pointer', fontSize: 20 }}>←</span>
        <span style={{ fontSize: 12, color: '#999' }}>{module.title}</span>
      </div>

      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>{lesson.title}</h1>

      {animation && <div style={{ marginBottom: 20 }}>{animation}</div>}

      {lesson.content.map((paragraph, i) => (
        <div key={i} style={{
          marginBottom: 16, fontSize: 15, lineHeight: 1.8,
          whiteSpace: 'pre-line', color: '#333',
        }}>
          {paragraph}
        </div>
      ))}

      <div className="card" style={{ background: '#f0f7ff', marginTop: 24 }}>
        <div style={{ fontWeight: 600, marginBottom: 8, color: '#1677ff' }}>本节要点</div>
        {lesson.keyPoints.map((point, i) => (
          <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6, fontSize: 14 }}>
            <span>•</span>
            <span>{point}</span>
          </div>
        ))}
      </div>

      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: 16, background: '#fff', borderTop: '1px solid #eee', maxWidth: 500, margin: '0 auto' }}>
        {!isCompleted ? (
          <Button block color="primary" size="large" onClick={handleComplete}>
            学完了，标记完成
          </Button>
        ) : nextLesson ? (
          <Button block color="primary" size="large" onClick={() => navigate(`/courses/${nextLesson.id}`)}>
            下一课：{nextLesson.title}
          </Button>
        ) : (
          <Button block color="success" size="large" onClick={() => navigate(`/quiz/${module.id}`)}>
            全部学完！去测验
          </Button>
        )}
      </div>
    </div>
  )
}
