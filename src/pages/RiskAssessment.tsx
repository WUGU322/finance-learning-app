import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Result } from 'antd-mobile'

const questions = [
  { q: '你的年龄段是？', options: ['25岁以下', '25-35岁', '35-50岁', '50岁以上'], scores: [4, 3, 2, 1] },
  { q: '你的月收入水平？', options: ['5000以下', '5000-15000', '15000-30000', '30000以上'], scores: [1, 2, 3, 4] },
  { q: '你有多少个月的紧急备用金？', options: ['没有', '1-3个月', '3-6个月', '6个月以上'], scores: [1, 2, 3, 4] },
  { q: '如果投资亏损20%，你会？', options: ['立刻全部卖出', '卖出一部分', '不动，等待恢复', '加仓买入更多'], scores: [1, 2, 3, 4] },
  { q: '你的投资期限预期是？', options: ['1年以内', '1-3年', '3-5年', '5年以上'], scores: [1, 2, 3, 4] },
  { q: '你目前的负债情况？', options: ['负债较重', '有房贷/车贷', '少量负债', '无负债'], scores: [1, 2, 3, 4] },
  { q: '你对投资知识的了解程度？', options: ['完全不懂', '了解一点', '比较了解', '非常熟悉'], scores: [1, 2, 3, 4] },
]

export default function RiskAssessment() {
  const navigate = useNavigate()
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [finished, setFinished] = useState(false)

  const handleAnswer = (scoreIndex: number) => {
    const newAnswers = [...answers, questions[currentQ].scores[scoreIndex]]
    setAnswers(newAnswers)
    if (currentQ < questions.length - 1) {
      setCurrentQ(prev => prev + 1)
    } else {
      setFinished(true)
    }
  }

  if (finished) {
    const totalScore = answers.reduce((a, b) => a + b, 0)
    const maxScore = questions.length * 4
    const percentage = (totalScore / maxScore) * 100

    let type: string, desc: string, suggestion: string
    if (percentage <= 35) {
      type = '保守型'
      desc = '你的风险承受能力较低，适合稳健的投资方式'
      suggestion = '建议配置：80%低风险（存款/债券基金）+ 20%中风险（指数基金）'
    } else if (percentage <= 60) {
      type = '稳健型'
      desc = '你有一定的风险承受能力，可以适当配置中等风险资产'
      suggestion = '建议配置：40%低风险 + 40%中风险 + 20%较高风险'
    } else if (percentage <= 80) {
      type = '积极型'
      desc = '你的风险承受能力较强，可以配置较多权益类资产'
      suggestion = '建议配置：20%低风险 + 40%中风险 + 40%较高风险'
    } else {
      type = '进取型'
      desc = '你的风险承受能力很强，可以承受较大波动'
      suggestion = '建议配置：10%低风险 + 30%中风险 + 60%较高风险'
    }

    return (
      <div className="page" style={{ paddingTop: 40 }}>
        <Result status="success" title={`你是 ${type} 投资者`} description={desc} />
        <div className="card" style={{ marginTop: 20 }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>投资建议</div>
          <div style={{ fontSize: 14, color: '#666', lineHeight: 1.8 }}>{suggestion}</div>
        </div>
        <div className="card">
          <div style={{ fontWeight: 600, marginBottom: 8 }}>得分详情</div>
          <div style={{ fontSize: 14, color: '#666' }}>
            总分：{totalScore}/{maxScore}（风险承受指数：{Math.round(percentage)}%）
          </div>
        </div>
        <Button block color="primary" style={{ marginTop: 20 }} onClick={() => navigate(-1)}>
          返回工具箱
        </Button>
      </div>
    )
  }

  return (
    <div className="page">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
        <span onClick={() => navigate(-1)} style={{ cursor: 'pointer', fontSize: 20 }}>←</span>
        <span style={{ fontSize: 16, fontWeight: 600 }}>风险评估问卷</span>
      </div>

      <div style={{ fontSize: 12, color: '#999', marginBottom: 8 }}>
        第 {currentQ + 1}/{questions.length} 题
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.6 }}>{questions[currentQ].q}</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {questions[currentQ].options.map((option, i) => (
          <div
            key={i}
            onClick={() => handleAnswer(i)}
            className="card"
            style={{ cursor: 'pointer', fontSize: 14, margin: 0 }}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  )
}
