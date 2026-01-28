import type { Insight } from '../types/dashboard'

interface InsightCardProps {
  insights?: Insight[]
}

const insightTypeConfig = {
  tip: { color: 'var(--accent-secondary)', bg: 'rgba(121, 192, 255, 0.1)' },
  achievement: { color: 'var(--accent-primary)', bg: 'rgba(88, 166, 255, 0.1)' },
  milestone: { color: 'var(--accent-success)', bg: 'rgba(63, 185, 80, 0.1)' }
}

export function InsightCard({ insights = [] }: InsightCardProps) {
  return (
    <div className="card">
      <div style={{ marginBottom: 'var(--space-lg)' }}>
        <h3 style={{ margin: 0, marginBottom: 'var(--space-sm)' }}>💡 Insights & Tips</h3>
        <p className="text-muted" style={{ margin: 0 }}>Personalized recommendations</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
        {insights.length === 0 ? (
          <p className="text-muted" style={{ margin: 0, textAlign: 'center', padding: 'var(--space-lg)' }}>
            No insights yet. Keep learning!
          </p>
        ) : (
          insights.map((insight) => {
            const config = insightTypeConfig[insight.type]
            return (
              <div
                key={insight.id}
                style={{
                  padding: 'var(--space-lg)',
                  backgroundColor: config.bg,
                  border: `1px solid ${config.color}`,
                  borderRadius: 'var(--radius-lg)',
                  transition: 'all var(--transition-normal)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateX(4px)'
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 'var(--space-md)'
                }}>
                  <span style={{ fontSize: '1.5em', minWidth: '24px' }}>
                    {insight.icon}
                  </span>
                  <div style={{ flex: 1 }}>
                    <h4 style={{
                      margin: '0 0 var(--space-xs) 0',
                      color: config.color,
                      fontSize: 'var(--font-size-base)',
                      fontWeight: 600
                    }}>
                      {insight.title}
                    </h4>
                    <p style={{
                      margin: '0 0 var(--space-sm) 0',
                      color: 'var(--text-secondary)',
                      fontSize: 'var(--font-size-sm)',
                      lineHeight: 'var(--line-height-normal)'
                    }}>
                      {insight.description}
                    </p>
                    <span style={{
                      fontSize: 'var(--font-size-xs)',
                      color: 'var(--text-tertiary)'
                    }}>
                      {new Date(insight.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
