import { useNavigate } from 'react-router-dom'
import { Navbar } from '../../components/Navbar'
import { Sidebar } from '../../components/Sidebar'

export default function QuizPage() {
  const navigate = useNavigate()

  return (
    <>
      <Navbar />
      <Sidebar />
      <main style={{ marginLeft: '250px' }}>
        <div className="container">
          <div style={{ marginBottom: 'var(--space-2xl)' }}>
            <h1>Quiz</h1>
            <p className="text-muted">Test your knowledge on various topics</p>
          </div>

          <div className="card" style={{ padding: 'var(--space-2xl)', textAlign: 'center' }}>
            <p style={{ fontSize: '3em', marginBottom: 'var(--space-lg)' }}>❓</p>
            <h2>Quiz Feature Coming Soon</h2>
            <p className="text-muted" style={{ marginBottom: 'var(--space-lg)' }}>
              We're working on bringing interactive quizzes to help you test your knowledge.
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              style={{
                padding: 'var(--space-md) var(--space-xl)',
                background: 'var(--accent-primary)',
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
              Back to Dashboard
            </button>
          </div>
        </div>
      </main>
    </>
  )
}
