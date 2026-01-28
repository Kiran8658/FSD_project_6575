import { Navbar } from '../../components/Navbar'
import { Sidebar } from '../../components/Sidebar'

export default function ImpactAssessmentPage() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <main style={{ marginLeft: '250px', padding: 'var(--space-2xl)' }}>
        <div className="container">
          <div style={{ marginBottom: 'var(--space-2xl)' }}>
            <h1>Impact Assessment</h1>
            <p className="text-muted">Assess the impact of your learning progress</p>
          </div>

          <div className="card" style={{ padding: 'var(--space-2xl)', textAlign: 'center' }}>
            <p style={{ fontSize: '3em', marginBottom: 'var(--space-lg)' }}>📊</p>
            <h2>Impact Assessment</h2>
            <p className="text-muted" style={{ marginBottom: 'var(--space-lg)' }}>
              Coming soon - evaluate the impact of your learning activities.
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
