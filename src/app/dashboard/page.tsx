import { useEffect, useState } from 'react'
import { Navbar } from '../../components/Navbar'
import { Sidebar } from '../../components/Sidebar'
import { ActivityChart } from '../../components/ActivityChart'
import { ConsistencyCard } from '../../components/ConsistencyCard'
import { SkillChart } from '../../components/SkillChart'
import { InsightCard } from '../../components/InsightCard'
import api from '../../services/api'
import type { DashboardStats, ActivityData, Skill, Insight } from '../../types/dashboard'

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [activities, setActivities] = useState<ActivityData[]>([])
  const [skills, setSkills] = useState<Skill[]>([])
  const [insights, setInsights] = useState<Insight[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true)
      const [statsData, activityData, skillsData, insightsData] = await Promise.all([
        api.getDashboardStats(),
        api.getActivityData(7),
        api.getSkills(),
        api.getInsights()
      ])
      setStats(statsData)
      setActivities(activityData)
      setSkills(skillsData)
      setInsights(insightsData)
      setLoading(false)
    }

    loadDashboard()
  }, [])

  if (loading) {
    return (
      <>
        <Navbar />
        <Sidebar />
        <main style={{ marginLeft: '250px', padding: 'var(--space-2xl)', textAlign: 'center' }}>
          <p className="text-muted">Loading your dashboard...</p>
        </main>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <Sidebar />
      <main style={{ marginLeft: '250px' }}>
        <div className="container">
          {/* Header */}
          <div style={{ marginBottom: 'var(--space-2xl)' }}>
            <h1>Welcome back! 👋</h1>
            <p className="text-muted">Track your learning progress and achievements</p>
          </div>

          {/* Stats Cards */}
          {stats && (
            <div className="grid cols-4" style={{ marginBottom: 'var(--space-2xl)' }}>
              <div className="card">
                <p className="text-muted" style={{ margin: '0 0 var(--space-md) 0' }}>Total Activities</p>
                <div style={{ fontSize: '2em', fontWeight: 'bold', color: 'var(--accent-primary)' }}>
                  {stats.totalActivities}
                </div>
              </div>
              <div className="card">
                <p className="text-muted" style={{ margin: '0 0 var(--space-md) 0' }}>Current Streak</p>
                <div style={{ fontSize: '2em', fontWeight: 'bold', color: 'var(--accent-secondary)' }}>
                  {stats.currentStreak}
                </div>
              </div>
              <div className="card">
                <p className="text-muted" style={{ margin: '0 0 var(--space-md) 0' }}>Skills Learned</p>
                <div style={{ fontSize: '2em', fontWeight: 'bold', color: 'var(--accent-success)' }}>
                  {stats.skillsLearned}
                </div>
              </div>
              <div className="card">
                <p className="text-muted" style={{ margin: '0 0 var(--space-md) 0' }}>Consistency</p>
                <div style={{ fontSize: '2em', fontWeight: 'bold', color: 'var(--accent-primary)' }}>
                  {stats.consistencyRate}%
                </div>
              </div>
            </div>
          )}

          {/* Main Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: 'var(--space-lg)',
            marginBottom: 'var(--space-2xl)'
          }}>
            {/* Left Column */}
            <div>
              <ActivityChart data={activities} />
            </div>

            {/* Right Column */}
            <div>
              {stats && (
                <ConsistencyCard
                  currentStreak={stats.currentStreak}
                  longestStreak={stats.longestStreak}
                  consistencyRate={stats.consistencyRate}
                />
              )}
            </div>
          </div>

          {/* Skills Section */}
          <div style={{ marginBottom: 'var(--space-2xl)' }}>
            <SkillChart skills={skills} />
          </div>

          {/* Insights Section */}
          <div style={{ marginBottom: 'var(--space-2xl)' }}>
            <InsightCard insights={insights} />
          </div>
        </div>
      </main>

      <style>{`
        @media (max-width: 1024px) {
          main > div > div {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 768px) {
          .grid.cols-4 {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </>
  )
}
