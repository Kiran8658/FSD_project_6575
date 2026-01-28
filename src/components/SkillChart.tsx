import type { Skill } from '../types/dashboard'

interface SkillChartProps {
  skills?: Skill[]
  title?: string
}

export function SkillChart({ skills = [], title = 'Skills Progress' }: SkillChartProps) {
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  const getSkillColor = (level: number) => {
    if (level < 40) return 'var(--accent-warning)'
    if (level < 70) return 'var(--accent-secondary)'
    return 'var(--accent-success)'
  }

  return (
    <div className="card">
      <div style={{ marginBottom: 'var(--space-lg)' }}>
        <h3 style={{ margin: 0, marginBottom: 'var(--space-sm)' }}>{title}</h3>
        <p className="text-muted" style={{ margin: 0 }}>Track your skill development</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
          <div key={category}>
            <p style={{
              margin: '0 0 var(--space-md) 0',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 600,
              color: 'var(--accent-primary)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              {category}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              {categorySkills.map((skill) => (
                <div key={skill.name}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 'var(--space-xs)'
                  }}>
                    <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 500 }}>
                      {skill.name}
                    </span>
                    <span style={{
                      fontSize: 'var(--font-size-sm)',
                      fontWeight: 'bold',
                      color: getSkillColor(skill.level)
                    }}>
                      {skill.level}%
                    </span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '6px',
                    backgroundColor: 'var(--bg-tertiary)',
                    borderRadius: 'var(--radius-full)',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${skill.level}%`,
                      height: '100%',
                      backgroundColor: getSkillColor(skill.level),
                      borderRadius: 'var(--radius-full)',
                      transition: 'width 0.5s ease-out'
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
