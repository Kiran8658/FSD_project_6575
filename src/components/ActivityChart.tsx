import { useEffect, useState } from 'react'
import type { ActivityData } from '../types/dashboard'

interface ActivityChartProps {
  data?: ActivityData[]
  title?: string
}

export function ActivityChart({ data = [], title = 'Weekly Activity' }: ActivityChartProps) {
  const [maxValue, setMaxValue] = useState(0)

  useEffect(() => {
    if (data.length > 0) {
      setMaxValue(Math.max(...data.map(d => d.count)))
    }
  }, [data])

  const getBarColor = (count: number) => {
    if (count === 0) return 'var(--bg-tertiary)'
    if (count < 3) return 'var(--accent-primary)'
    if (count < 6) return 'var(--accent-secondary)'
    return 'var(--accent-primary)'
  }

  return (
    <div className="card">
      <div style={{ marginBottom: 'var(--space-lg)' }}>
        <h3 style={{ margin: 0, marginBottom: 'var(--space-sm)' }}>{title}</h3>
        <p className="text-muted" style={{ margin: 0 }}>Learning activities over time</p>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: 'var(--space-sm)',
        height: '200px'
      }}>
        {data.map((item) => (
          <div
            key={item.date}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--space-sm)'
            }}
          >
            <div
              style={{
                width: '100%',
                height: `${maxValue > 0 ? (item.count / maxValue) * 150 : 20}px`,
                backgroundColor: getBarColor(item.count),
                borderRadius: 'var(--radius-md)',
                transition: 'all var(--transition-normal)',
                cursor: 'pointer',
                minHeight: '20px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.8'
                e.currentTarget.style.transform = 'scaleY(1.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1'
                e.currentTarget.style.transform = 'scaleY(1)'
              }}
              title={`${item.count} activities`}
            />
            <span style={{
              fontSize: 'var(--font-size-xs)',
              color: 'var(--text-tertiary)',
              textAlign: 'center'
            }}>
              {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
