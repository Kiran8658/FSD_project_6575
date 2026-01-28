import { Navbar } from '../../components/Navbar'
import { Sidebar } from '../../components/Sidebar'

export default function PlanPage() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <main style={{ marginLeft: '250px', padding: 'var(--space-2xl)' }}>
        <div className="container">
          <div style={{ marginBottom: 'var(--space-2xl)' }}>
            <h1>Plan</h1>
            <p className="text-muted">Create and manage your learning plans</p>
          </div>

          <div className="card" style={{ padding: 'var(--space-2xl)', textAlign: 'center' }}>
            <p style={{ fontSize: '3em', marginBottom: 'var(--space-lg)' }}>📋</p>
            <h2>Plan</h2>
            <p className="text-muted" style={{ marginBottom: 'var(--space-lg)' }}>
              Coming soon - create detailed plans for your learning goals.
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
