import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, Result } from 'antd-mobile'
import { useProgress } from '../context/ProgressContext'
import { quizzes } from '../data/quizzes'
import { modules } from '../data/courses'

export default function Quiz() {
  const { moduleId } = useParams<{ moduleId: string }>()
  const navigate = useNavigate()
  const { saveQuizScore, addAchievement } = useProgress()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [finished, setFinished] = useState(false)

  const questions = quizzes[moduleId || ''] || []
  const module = modules.find(m => m.id === moduleId)

  if (!questions.length || !module) {
    return <div className="page"><p>测验未找到</p></div>
  }

  const current = questions[currentIndex]
  const isCorrect = selectedAnswer === current.correctIndex

  const handleSelect = (index: number) => {
    if (showResult) return
    setSelectedAnswer(index)
    setShowResult(true)
    if (index === current.correctIndex) {
      setCorrectCount(prev => prev + 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      const finalCorrect = correctCount + (selectedAnswer === current.correctIndex ? 0 : 0)
      const finalScore = Math.round((finalCorrect / questions.length) * 100)
      saveQuizScore(moduleId!, finalScore)
      if (finalScore >= 80) {
        addAchievement(`quiz-${moduleId}`)
      }
      setFinished(true)
    }
  }

  if (finished) {
    const finalScore = Math.round((correctCount / questions.length) * 100)
    return (
      <div className="page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
        <Result
          status={finalScore >= 80 ? 'success' : finalScore >= 60 ? 'warning' : 'error'}
          title={finalScore >= 80 ? '太棒了！' : finalScore >= 60 ? '还不错！' : '继续加油！'}
          description={`你答对了 ${correctCount}/${questions.length} 题，得分 ${finalScore} 分`}
        />
        <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
          <Button onClick={() => navigate('/courses')}>返回课程</Button>
          <Button color="primary" onClick={() => {
            setCurrentIndex(0)
            setSelectedAnswer(null)
            setShowResult(false)
            setCorrectCount(0)
            setFinished(false)
          }}>重新测验</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
        <span onClick={() => navigate(-1)} style={{ cursor: 'pointer', fontSize: 20 }}>←</span>
        <span style={{ fontSize: 14, color: '#666' }}>{module.title} - 测验</span>
      </div>

      <div style={{ fontSize: 12, color: '#999', marginBottom: 8 }}>
        第 {currentIndex + 1}/{questions.length} 题
      </div>

      <div style={{ background: '#f0f7ff', borderRadius: 12, padding: 16, marginBottom: 20 }}>
        <div style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.6 }}>{current.question}</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {current.options.map((option, i) => {
          let bg = '#f8f8f8'
          let border = '2px solid transparent'
          if (showResult) {
            if (i === current.correctIndex) {
              bg = '#f0fff0'
              border = '2px solid #52c41a'
            } else if (i === selectedAnswer && !isCorrect) {
              bg = '#fff0f0'
              border = '2px solid #ff4d4f'
            }
          } else if (i === selectedAnswer) {
            border = '2px solid #1677ff'
          }

          return (
            <div
              key={i}
              onClick={() => handleSelect(i)}
              style={{
                padding: '12px 16px', borderRadius: 10, background: bg, border,
                cursor: showResult ? 'default' : 'pointer', fontSize: 14, lineHeight: 1.5,
              }}
            >
              <span style={{ fontWeight: 600, marginRight: 8 }}>{String.fromCharCode(65 + i)}.</span>
              {option}
            </div>
          )
        })}
      </div>

      {showResult && (
        <div className="card" style={{ marginTop: 16, background: isCorrect ? '#f0fff0' : '#fff8f0' }}>
          <div style={{ fontWeight: 600, color: isCorrect ? '#52c41a' : '#fa8c16', marginBottom: 4 }}>
            {isCorrect ? '回答正确！' : '回答错误'}
          </div>
          <div style={{ fontSize: 13, color: '#666' }}>{current.explanation}</div>
        </div>
      )}

      {showResult && (
        <Button
          block color="primary" size="large"
          style={{ marginTop: 20 }}
          onClick={handleNext}
        >
          {currentIndex < questions.length - 1 ? '下一题' : '查看结果'}
        </Button>
      )}
    </div>
  )
}
