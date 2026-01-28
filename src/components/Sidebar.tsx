import { useNavigate } from 'react-router-dom'
import '../App.css'

export function Sidebar() {
  const navigate = useNavigate()

  const viewItems = [
    { label: 'All Ideas', path: '/ideas', icon: '📝' },
    { label: 'Impact Assessment', path: '/impact-assessment', icon: '📊' },
    { label: 'Impact vs Effort', path: '/impact-effort', icon: '⚖️' },
    { label: 'Roadmap', path: '/roadmap', icon: '🗺️' },
    { label: 'Plan', path: '/plan', icon: '📋' },
    { label: 'Delivery', path: '/delivery', icon: '🚀' },
    { label: 'Other Examples', path: '/examples', icon: '✨' }
  ]

  const bottomItems = [
    { label: 'Create a View', icon: '➕' },
    { label: 'Archive', icon: '📦' },
    { label: 'Project Settings', icon: '⚙️' }
  ]

  return (
    <aside style={{
      width: '250px',
      background: 'var(--bg-secondary)',
      borderRight: '1px solid var(--border-subtle)',
      padding: 'var(--space-lg)',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ marginTop: '80px', flex: 1 }}>
        {/* VIEWS Section */}
        <div style={{ marginBottom: 'var(--space-lg)' }}>
          <div style={{
            fontSize: 'var(--font-size-xs)',
            fontWeight: 600,
            color: 'var(--text-tertiary)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: 'var(--space-md)',
            paddingLeft: 'var(--space-md)'
          }}>
            Views
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
            {viewItems.map((item) => (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-md)',
                  width: '100%',
                  padding: 'var(--space-sm) var(--space-md)',
                  background: 'transparent',
                  border: '1px solid transparent',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-secondary)',
                  fontSize: 'var(--font-size-sm)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--bg-hover)'
                  e.currentTarget.style.color = 'var(--text-primary)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = 'var(--text-secondary)'
                }}
              >
                <span style={{ fontSize: '1.2em' }}>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-lg)', display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
        {bottomItems.map((item) => (
          <button
            key={item.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-md)',
              width: '100%',
              padding: 'var(--space-sm) var(--space-md)',
              background: 'transparent',
              border: '1px solid transparent',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-secondary)',
              fontSize: 'var(--font-size-sm)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
              textAlign: 'left'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--bg-hover)'
              e.currentTarget.style.color = 'var(--text-primary)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = 'var(--text-secondary)'
            }}
          >
            <span style={{ fontSize: '1.2em' }}>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </aside>
  )
}
