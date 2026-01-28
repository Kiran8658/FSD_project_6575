import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'

// Pages
import LandingPage from './app/page'
import DashboardPage from './app/dashboard/page'
import ProfilePage from './app/profile/[username]/page'
import SignInPage from './app/signin/page'
import SignUpPage from './app/signup/page'
import QuizPage from './app/quiz/page'
import SettingsPage from './app/settings/page'
import IdeasPage from './app/ideas/page'
import ImpactAssessmentPage from './app/impact-assessment/page'
import ImpactEffortPage from './app/impact-effort/page'
import RoadmapPage from './app/roadmap/page'
import PlanPage from './app/plan/page'
import DeliveryPage from './app/delivery/page'
import ExamplesPage from './app/examples/page'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/:username"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quiz"
            element={
              <ProtectedRoute>
                <QuizPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ideas"
            element={
              <ProtectedRoute>
                <IdeasPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/impact-assessment"
            element={
              <ProtectedRoute>
                <ImpactAssessmentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/impact-effort"
            element={
              <ProtectedRoute>
                <ImpactEffortPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/roadmap"
            element={
              <ProtectedRoute>
                <RoadmapPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/plan"
            element={
              <ProtectedRoute>
                <PlanPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/delivery"
            element={
              <ProtectedRoute>
                <DeliveryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/examples"
            element={
              <ProtectedRoute>
                <ExamplesPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
