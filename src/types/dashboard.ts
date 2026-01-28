export interface User {
  id: string
  username: string
  email: string
  name?: string
  avatar?: string
  bio?: string
  joinDate: string
}

export interface ActivityData {
  date: string
  count: number
}

export interface Skill {
  name: string
  level: number // 0-100
  category: string
}

export interface Insight {
  id: string
  title: string
  description: string
  type: 'tip' | 'achievement' | 'milestone'
  icon: string
  timestamp: string
}

export interface DashboardStats {
  totalActivities: number
  currentStreak: number
  longestStreak: number
  consistencyRate: number
  skillsLearned: number
}

export interface ConsistencyMetrics {
  week: number[]
  month: number[]
  year: number
}
