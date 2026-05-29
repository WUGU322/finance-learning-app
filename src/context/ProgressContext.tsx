import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

interface Progress {
  completedLessons: string[]
  quizScores: Record<string, number>
  achievements: string[]
  simulationBalance: number
  simulationPortfolio: Record<string, number>
}

interface ProgressContextType {
  progress: Progress
  completeLesson: (lessonId: string) => void
  saveQuizScore: (moduleId: string, score: number) => void
  addAchievement: (id: string) => void
  updateSimulation: (balance: number, portfolio: Record<string, number>) => void
  getModuleProgress: (moduleId: string, totalLessons: number) => number
}

const defaultProgress: Progress = {
  completedLessons: [],
  quizScores: {},
  achievements: [],
  simulationBalance: 100000,
  simulationPortfolio: {},
}

const ProgressContext = createContext<ProgressContextType | null>(null)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<Progress>(() => {
    const saved = localStorage.getItem('finance-learning-progress')
    return saved ? JSON.parse(saved) : defaultProgress
  })

  useEffect(() => {
    localStorage.setItem('finance-learning-progress', JSON.stringify(progress))
  }, [progress])

  const completeLesson = (lessonId: string) => {
    setProgress(prev => {
      if (prev.completedLessons.includes(lessonId)) return prev
      const updated = { ...prev, completedLessons: [...prev.completedLessons, lessonId] }
      return updated
    })
  }

  const saveQuizScore = (moduleId: string, score: number) => {
    setProgress(prev => ({
      ...prev,
      quizScores: { ...prev.quizScores, [moduleId]: Math.max(prev.quizScores[moduleId] || 0, score) }
    }))
  }

  const addAchievement = (id: string) => {
    setProgress(prev => {
      if (prev.achievements.includes(id)) return prev
      return { ...prev, achievements: [...prev.achievements, id] }
    })
  }

  const updateSimulation = (balance: number, portfolio: Record<string, number>) => {
    setProgress(prev => ({ ...prev, simulationBalance: balance, simulationPortfolio: portfolio }))
  }

  const getModuleProgress = (moduleId: string, totalLessons: number) => {
    const completed = progress.completedLessons.filter(id => id.startsWith(moduleId)).length
    return totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0
  }

  return (
    <ProgressContext.Provider value={{ progress, completeLesson, saveQuizScore, addAchievement, updateSimulation, getModuleProgress }}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider')
  return ctx
}
