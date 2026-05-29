import { Routes, Route } from 'react-router-dom'
import { ProgressProvider } from './context/ProgressContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Courses from './pages/Courses'
import CourseDetail from './pages/CourseDetail'
import Quiz from './pages/Quiz'
import Tools from './pages/Tools'
import CompoundCalculator from './pages/CompoundCalculator'
import SavingsCalculator from './pages/SavingsCalculator'
import RiskAssessment from './pages/RiskAssessment'
import Simulate from './pages/Simulate'
import MarketData from './pages/MarketData'
import Profile from './pages/Profile'

function App() {
  return (
    <ProgressProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/market" element={<MarketData />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/quiz/:moduleId" element={<Quiz />} />
        <Route path="/tools/compound" element={<CompoundCalculator />} />
        <Route path="/tools/savings" element={<SavingsCalculator />} />
        <Route path="/tools/risk" element={<RiskAssessment />} />
        <Route path="/simulate" element={<Simulate />} />
      </Routes>
    </ProgressProvider>
  )
}

export default App
