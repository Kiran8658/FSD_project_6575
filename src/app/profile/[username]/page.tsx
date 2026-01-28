import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Navbar } from '../../../components/Navbar'
import { Sidebar } from '../../../components/Sidebar'
import { SkillChart } from '../../../components/SkillChart'
import { ActivityChart } from '../../../components/ActivityChart'
import api from '../../../services/api'
import type { User, Skill, ActivityData } from '../../../types/dashboard'

export default function ProfilePage() {
  const params = useParams<{ username?: string }>()
  const [user, setUser] = useState<User | null>(null)
  const [skills, setSkills] = useState<Skill[]>([])
  const [activities, setActivities] = useState<ActivityData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true)
        setError(null)
        const username = params.username
        
        if (!username) {
          setError('Username not provided')
          setLoading(false)
          return
        }

        const [userData, skillsData, activityData] = await Promise.all([
          api.getUser(username),
          api.getSkills(),
          api.getActivityData(30)
        ])
        setUser(userData)
        setSkills(skillsData)
        setActivities(activityData)
        setLoading(false)
      } catch (err) {
        setError('Failed to load profile')
        setLoading(false)
      }
    }

    loadProfile()
  }, [params.username])

  if (loading) {
    return (
      <>
        <Navbar />
        <Sidebar />
        <main style={{ marginLeft: '250px', padding: 'var(--space-2xl)', textAlign: 'center' }}>
          <p className="text-muted">Loading profile...</p>
        </main>
      </>
    )
  }

  if (error || !user) {
    return (
      <>
        <Navbar />
        <Sidebar />
        <main style={{ marginLeft: '250px', padding: 'var(--space-2xl)', textAlign: 'center' }}>
          <p className="text-muted">{error || 'User not found'}</p>
        </main>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <Sidebar />
      <main style={{ marginLeft: '250px', background: 'var(--bg-primary)', minHeight: '100vh' }}>
        <div className="container md">
          {/* Profile Header Card */}
          <div className="card elevated" style={{ marginBottom: 'var(--space-2xl)', marginTop: 'var(--space-2xl)' }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 'var(--space-xl)',
              marginBottom: 'var(--space-xl)'
            }}>
              {/* Avatar */}
              <div style={{
                width: '140px',
                height: '140px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '4em',
                fontWeight: 'bold',
                flexShrink: 0
              }}>
                {(user.name || user.username).charAt(0).toUpperCase()}
              </div>

              {/* User Info */}
              <div style={{ flex: 1 }}>
                <h1 style={{ margin: '0 0 var(--space-sm) 0', fontSize: '1.8em', color: 'var(--accent-primary)' }}>
                  {(user.name || user.username).toUpperCase()}
                </h1>
                <p style={{ margin: '0 0 var(--space-xs) 0', color: 'var(--accent-primary)', fontSize: 'var(--font-size-base)' }}>
                  {user.email}
                </p>
                <p style={{ margin: '0 0 var(--space-md) 0', color: 'var(--text-secondary)', fontSize: 'var(--font-size-base)' }}>
                  {user.id}
                </p>
                <div style={{
                  display: 'inline-block',
                  padding: 'var(--space-xs) var(--space-md)',
                  background: 'rgba(26, 127, 55, 0.1)',
                  color: 'var(--accent-success)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 600
                }}>
                  ✓ Approved
                </div>
              </div>
            </div>

            {/* College & Info Section */}
            <div style={{
              borderTop: '1px solid var(--border-subtle)',
              paddingTop: 'var(--space-lg)',
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 'var(--space-lg)'
            }}>
              <div>
                <p className="text-muted" style={{ margin: '0 0 var(--space-xs) 0', fontSize: 'var(--font-size-sm)' }}>
                  College
                </p>
                <p style={{ margin: 0, fontWeight: 600, fontSize: 'var(--font-size-base)' }}>
                  KLH
                </p>
              </div>
              <div>
                <p className="text-muted" style={{ margin: '0 0 var(--space-xs) 0', fontSize: 'var(--font-size-sm)' }}>
                  Last Crawled At
                </p>
                <p style={{ margin: 0, fontWeight: 600, fontSize: 'var(--font-size-base)' }}>
                  6 hours ago
                </p>
              </div>
            </div>

            {/* Badges */}
            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-lg)', marginTop: 'var(--space-lg)' }}>
              <div style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap' }}>
                {['KLH-Y24-P1-B5', 'KLH-Y24-P1-B1', 'KLH-Y24-ALL'].map((badge) => (
                  <span
                    key={badge}
                    style={{
                      padding: 'var(--space-xs) var(--space-md)',
                      background: 'var(--accent-primary)',
                      color: '#fff',
                      borderRadius: 'var(--radius-md)',
                      fontSize: 'var(--font-size-sm)',
                      fontWeight: 600
                    }}
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Coding Profiles Section */}
          <div style={{ marginBottom: 'var(--space-2xl)' }}>
            <h2 style={{ marginBottom: 'var(--space-lg)', fontSize: '1.3em', fontWeight: 600 }}>
              CODING PROFILES
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'var(--space-lg)',
              marginBottom: 'var(--space-lg)'
            }}>
              {/* MentorPick Card */}
              <div className="card" style={{ borderTop: `3px solid var(--accent-primary)` }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-md)',
                  marginBottom: 'var(--space-lg)',
                  paddingBottom: 'var(--space-lg)',
                  borderBottom: '1px solid var(--border-subtle)'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: 'var(--accent-primary)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: '1.2em'
                  }}>
                    🎯
                  </div>
                  <h3 style={{ margin: 0, fontWeight: 600 }}>MENTORPICK</h3>
                </div>

                <div style={{ display: 'grid', gap: 'var(--space-md)' }}>
                  <div style={{
                    padding: 'var(--space-md)',
                    background: 'var(--bg-tertiary)',
                    borderRadius: 'var(--radius-md)',
                    textAlign: 'center'
                  }}>
                    <p className="text-muted" style={{ margin: '0 0 var(--space-xs) 0', fontSize: 'var(--font-size-sm)' }}>
                      Last Updated
                    </p>
                    <p style={{ margin: 0, fontWeight: 600 }}>6 hours ago</p>
                  </div>

                  <div style={{
                    padding: 'var(--space-md)',
                    background: 'var(--bg-tertiary)',
                    borderRadius: 'var(--radius-md)',
                    textAlign: 'center'
                  }}>
                    <p className="text-muted" style={{ margin: '0 0 var(--space-xs) 0', fontSize: 'var(--font-size-sm)' }}>
                      Total Solved Count
                    </p>
                    <p style={{ margin: 0, fontWeight: 600, fontSize: '1.3em', color: 'var(--accent-primary)' }}>7</p>
                  </div>

                  <div style={{
                    padding: 'var(--space-md)',
                    background: 'var(--bg-tertiary)',
                    borderRadius: 'var(--radius-md)',
                    textAlign: 'center'
                  }}>
                    <p className="text-muted" style={{ margin: '0 0 var(--space-xs) 0', fontSize: 'var(--font-size-sm)' }}>
                      Contest Participated
                    </p>
                    <p style={{ margin: 0, fontWeight: 600, fontSize: '1.3em', color: 'var(--accent-primary)' }}>2 <span style={{ color: 'var(--accent-danger)', fontSize: '0.8em' }}>*</span></p>
                  </div>

                  <div style={{
                    padding: 'var(--space-md)',
                    background: 'var(--bg-tertiary)',
                    borderRadius: 'var(--radius-md)',
                    textAlign: 'center'
                  }}>
                    <p className="text-muted" style={{ margin: '0 0 var(--space-xs) 0', fontSize: 'var(--font-size-sm)' }}>
                      Last Contest
                    </p>
                    <p style={{ margin: 0, fontWeight: 600, fontSize: '0.9em' }}>[BeiingZero] - Skill Forge-Round-0</p>
                  </div>

                  <div style={{
                    padding: 'var(--space-md)',
                    background: 'var(--bg-tertiary)',
                    borderRadius: 'var(--radius-md)',
                    textAlign: 'center'
                  }}>
                    <p className="text-muted" style={{ margin: '0 0 var(--space-xs) 0', fontSize: 'var(--font-size-sm)' }}>
                      Accuracy
                    </p>
                    <p style={{ margin: 0, fontWeight: 600, fontSize: '1.3em', color: 'var(--accent-success)' }}>87.5%</p>
                  </div>
                </div>
              </div>

              {/* CodeForces Card */}
              <div className="card" style={{ borderTop: `3px solid var(--accent-danger)` }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-md)',
                  marginBottom: 'var(--space-lg)',
                  paddingBottom: 'var(--space-lg)',
                  borderBottom: '1px solid var(--border-subtle)'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: 'var(--accent-danger)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: '1.2em'
                  }}>
                    ⚡
                  </div>
                  <h3 style={{ margin: 0, fontWeight: 600 }}>CODEFORCES</h3>
                </div>

                <div style={{ display: 'grid', gap: 'var(--space-md)' }}>
                  <div style={{
                    padding: 'var(--space-md)',
                    background: 'var(--bg-tertiary)',
                    borderRadius: 'var(--radius-md)',
                    textAlign: 'center'
                  }}>
                    <p className="text-muted" style={{ margin: '0 0 var(--space-xs) 0', fontSize: 'var(--font-size-sm)' }}>
                      Last Updated
                    </p>
                    <p style={{ margin: 0, fontWeight: 600 }}>6 hours ago</p>
                  </div>

                  <div style={{
                    padding: 'var(--space-md)',
                    background: 'var(--bg-tertiary)',
                    borderRadius: 'var(--radius-md)',
                    textAlign: 'center'
                  }}>
                    <p className="text-muted" style={{ margin: '0 0 var(--space-xs) 0', fontSize: 'var(--font-size-sm)' }}>
                      Total Solved Count
                    </p>
                    <p style={{ margin: 0, fontWeight: 600, fontSize: '1.3em', color: 'var(--accent-danger)' }}>0</p>
                  </div>

                  <div style={{
                    padding: 'var(--space-md)',
                    background: 'var(--bg-tertiary)',
                    borderRadius: 'var(--radius-md)',
                    textAlign: 'center'
                  }}>
                    <p className="text-muted" style={{ margin: '0 0 var(--space-xs) 0', fontSize: 'var(--font-size-sm)' }}>
                      Last Contest
                    </p>
                    <p style={{ margin: 0, fontWeight: 600, fontSize: '0.9em', color: 'var(--text-tertiary)' }}>NA</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Note */}
            <p className="text-muted" style={{
              fontSize: 'var(--font-size-sm)',
              padding: 'var(--space-md)',
              background: 'rgba(158, 106, 3, 0.1)',
              borderLeft: `3px solid var(--accent-warning)`,
              borderRadius: 'var(--radius-md)',
              margin: 0
            }}>
              <span style={{ color: 'var(--accent-danger)', fontWeight: 600 }}>* Note:</span> Participation in global contests is considered only if at least one successful submission has been made during the contest.
            </p>
          </div>

          {/* Charts Section */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'var(--space-lg)',
            marginBottom: 'var(--space-2xl)'
          }}>
            <div className="card">
              <SkillChart skills={skills} title="Skills Overview" />
            </div>
            <div className="card">
              <ActivityChart data={activities} title="Monthly Activity" />
            </div>
          </div>
        </div>
      </main>

      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
          div[style*="grid-template-columns: repeat(3"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  )
}
