import { Navbar } from '../../components/Navbar'
import { Sidebar } from '../../components/Sidebar'

export default function ImpactEffortPage() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <main style={{ marginLeft: '250px', padding: 'var(--space-2xl)' }}>
        <div className="container">
          <div style={{ marginBottom: 'var(--space-2xl)' }}>
            <h1>Impact vs Effort</h1>
            <p className="text-muted">Analyze impact versus effort for your learning goals</p>
          </div>

          <div className="card" style={{ padding: 'var(--space-2xl)', textAlign: 'center' }}>
            <p style={{ fontSize: '3em', marginBottom: 'var(--space-lg)' }}>⚖️</p>
            <h2>Impact vs Effort</h2>
            <p className="text-muted" style={{ marginBottom: 'var(--space-lg)' }}>
              Coming soon - compare impact and effort across your activities.
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
