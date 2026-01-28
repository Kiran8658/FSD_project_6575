import { Navbar } from '../../components/Navbar'
import { Sidebar } from '../../components/Sidebar'

export default function ExamplesPage() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <main style={{ marginLeft: '250px', padding: 'var(--space-2xl)' }}>
        <div className="container">
          <div style={{ marginBottom: 'var(--space-2xl)' }}>
            <h1>Other Examples</h1>
            <p className="text-muted">Browse example learning scenarios and use cases</p>
          </div>

          <div className="card" style={{ padding: 'var(--space-2xl)', textAlign: 'center' }}>
            <p style={{ fontSize: '3em', marginBottom: 'var(--space-lg)' }}>✨</p>
            <h2>Other Examples</h2>
            <p className="text-muted" style={{ marginBottom: 'var(--space-lg)' }}>
              Coming soon - explore example learning paths and use cases.
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
