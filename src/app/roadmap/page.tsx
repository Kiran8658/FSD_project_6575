import { Navbar } from '../../components/Navbar'
import { Sidebar } from '../../components/Sidebar'

export default function RoadmapPage() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <main style={{ marginLeft: '250px', padding: 'var(--space-2xl)' }}>
        <div className="container">
          <div style={{ marginBottom: 'var(--space-2xl)' }}>
            <h1>Roadmap</h1>
            <p className="text-muted">Your learning roadmap and milestones</p>
          </div>

          <div className="card" style={{ padding: 'var(--space-2xl)', textAlign: 'center' }}>
            <p style={{ fontSize: '3em', marginBottom: 'var(--space-lg)' }}>🗺️</p>
            <h2>Roadmap</h2>
            <p className="text-muted" style={{ marginBottom: 'var(--space-lg)' }}>
              Coming soon - plan your learning journey with a detailed roadmap.
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
