import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Navbar } from '../../components/Navbar'
import { Sidebar } from '../../components/Sidebar'

export default function SettingsPage() {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()

  const handleLogout = () => {
    signOut()
    navigate('/')
  }

  return (
    <>
      <Navbar />
      <Sidebar />
      <main style={{ marginLeft: '250px' }}>
        <div className="container">
          <div style={{ marginBottom: 'var(--space-2xl)' }}>
            <h1>Settings</h1>
            <p className="text-muted">Manage your account and preferences</p>
          </div>

          <div className="card" style={{ marginBottom: 'var(--space-2xl)' }}>
            <h2 style={{ marginTop: 0 }}>Account Information</h2>
            <div style={{ marginBottom: 'var(--space-lg)' }}>
              <p className="text-muted" style={{ marginBottom: 'var(--space-sm)' }}>Name</p>
              <p style={{ margin: 0, fontSize: 'var(--font-size-lg)', fontWeight: 500 }}>{user?.name}</p>
            </div>
            <div style={{ marginBottom: 'var(--space-lg)' }}>
              <p className="text-muted" style={{ marginBottom: 'var(--space-sm)' }}>Email</p>
              <p style={{ margin: 0, fontSize: 'var(--font-size-lg)', fontWeight: 500 }}>{user?.email}</p>
            </div>
            <div>
              <p className="text-muted" style={{ marginBottom: 'var(--space-sm)' }}>Username</p>
              <p style={{ margin: 0, fontSize: 'var(--font-size-lg)', fontWeight: 500 }}>@{user?.username}</p>
            </div>
          </div>

          <div className="card">
            <h2 style={{ marginTop: 0 }}>Danger Zone</h2>
            <button
              onClick={handleLogout}
              style={{
                padding: 'var(--space-md) var(--space-xl)',
                background: '#ff4444',
                color: '#fff',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                fontSize: 'var(--font-size-base)',
                fontWeight: 600,
                transition: 'opacity var(--transition-fast)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              Logout
            </button>
          </div>
        </div>
      </main>
    </>
  )
}
