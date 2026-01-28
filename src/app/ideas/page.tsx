import { Navbar } from '../../components/Navbar'
import { Sidebar } from '../../components/Sidebar'

export default function IdeasPage() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <main style={{ marginLeft: '250px', padding: 'var(--space-2xl)' }}>
        <div className="container">
          <div style={{ marginBottom: 'var(--space-2xl)' }}>
            <h1>All Ideas</h1>
            <p className="text-muted">View and manage all your learning ideas</p>
          </div>

          <div className="card" style={{ padding: 'var(--space-2xl)', textAlign: 'center' }}>
            <p style={{ fontSize: '3em', marginBottom: 'var(--space-lg)' }}>📝</p>
            <h2>All Ideas</h2>
            <p className="text-muted" style={{ marginBottom: 'var(--space-lg)' }}>
              Coming soon - view all your learning ideas in one place.
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
