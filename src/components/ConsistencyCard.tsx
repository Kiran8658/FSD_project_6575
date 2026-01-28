interface ConsistencyCardProps {
  currentStreak: number
  longestStreak: number
  consistencyRate: number
}

export function ConsistencyCard({ currentStreak, longestStreak, consistencyRate }: ConsistencyCardProps) {
  const getStreakColor = (streak: number) => {
    if (streak === 0) return 'var(--text-tertiary)'
    if (streak < 7) return 'var(--accent-warning)'
    if (streak < 14) return 'var(--accent-secondary)'
    return 'var(--accent-primary)'
  }

  return (
    <div className="card elevated">
      <div style={{ marginBottom: 'var(--space-lg)' }}>
        <h3 style={{ margin: 0, marginBottom: 'var(--space-xs)' }}>🔥 Consistency</h3>
        <p className="text-muted" style={{ margin: 0, fontSize: 'var(--font-size-sm)' }}>Your learning streak momentum</p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 'var(--space-lg)',
        marginBottom: 'var(--space-lg)'
      }}>
        {/* Current Streak */}
        <div style={{
          padding: 'var(--space-lg)',
          backgroundColor: 'var(--bg-tertiary)',
          borderRadius: 'var(--radius-lg)',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '2.5em',
            fontWeight: 'bold',
            color: getStreakColor(currentStreak),
            marginBottom: 'var(--space-sm)'
          }}>
            {currentStreak}
          </div>
          <p className="text-muted" style={{ margin: 0, fontSize: 'var(--font-size-sm)' }}>
            Current Streak
          </p>
        </div>

        {/* Longest Streak */}
        <div style={{
          padding: 'var(--space-lg)',
          backgroundColor: 'var(--bg-tertiary)',
          borderRadius: 'var(--radius-lg)',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '2.5em',
            fontWeight: 'bold',
            color: 'var(--accent-success)',
            marginBottom: 'var(--space-sm)'
          }}>
            {longestStreak}
          </div>
          <p className="text-muted" style={{ margin: 0, fontSize: 'var(--font-size-sm)' }}>
            Longest Streak
          </p>
        </div>
      </div>

      {/* Consistency Rate */}
      <div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 'var(--space-sm)'
        }}>
          <p className="text-muted" style={{ margin: 0, fontSize: 'var(--font-size-sm)' }}>
            Consistency Rate
          </p>
          <span style={{
            fontWeight: 'bold',
            color: 'var(--accent-primary)'
          }}>
            {consistencyRate}%
          </span>
        </div>
        <div style={{
          width: '100%',
          height: '8px',
          backgroundColor: 'var(--bg-tertiary)',
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${consistencyRate}%`,
            height: '100%',
            background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))',
            borderRadius: 'var(--radius-full)',
            transition: 'width 0.5s ease-out'
          }} />
        </div>
      </div>
    </div>
  )
}
