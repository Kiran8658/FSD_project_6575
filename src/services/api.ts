import type { User, DashboardStats, ActivityData, Skill, Insight } from '../types/dashboard'

// Mock data - Replace with actual API calls
const mockUser: User = {
  id: '1',
  username: 'devpulse_user',
  email: 'user@example.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=devpulse',
  bio: 'Passionate developer & lifelong learner',
  joinDate: '2024-01-15'
}

const mockStats: DashboardStats = {
  totalActivities: 156,
  currentStreak: 12,
  longestStreak: 34,
  consistencyRate: 87,
  skillsLearned: 8
}

const mockActivityData: ActivityData[] = [
  { date: '2024-01-10', count: 5 },
  { date: '2024-01-11', count: 8 },
  { date: '2024-01-12', count: 6 },
  { date: '2024-01-13', count: 9 },
  { date: '2024-01-14', count: 7 },
  { date: '2024-01-15', count: 4 },
  { date: '2024-01-16', count: 8 }
]

const mockSkills: Skill[] = [
  { name: 'React', level: 90, category: 'Frontend' },
  { name: 'TypeScript', level: 85, category: 'Language' },
  { name: 'Node.js', level: 80, category: 'Backend' },
  { name: 'CSS', level: 88, category: 'Frontend' },
  { name: 'Database Design', level: 75, category: 'Backend' },
  { name: 'DevOps', level: 70, category: 'Tools' }
]

const mockInsights: Insight[] = [
  {
    id: '1',
    title: 'Amazing Streak!',
    description: 'You\'ve maintained a 12-day learning streak. Keep it up!',
    type: 'achievement',
    icon: '🔥',
    timestamp: '2024-01-16'
  },
  {
    id: '2',
    title: 'Focus on Weak Areas',
    description: 'Consider spending more time on DevOps concepts this week.',
    type: 'tip',
    icon: '💡',
    timestamp: '2024-01-16'
  },
  {
    id: '3',
    title: 'Milestone Reached!',
    description: 'You\'ve completed 150+ learning activities. You\'re on fire! 🚀',
    type: 'milestone',
    icon: '🎯',
    timestamp: '2024-01-15'
  }
]

export const api = {
  // User endpoints
  getUser: async (username: string): Promise<User> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    return { ...mockUser, username }
  },

  getUserById: async (id: string): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    return { ...mockUser, id }
  },

  // Dashboard endpoints
  getDashboardStats: async (): Promise<DashboardStats> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    return mockStats
  },

  getActivityData: async (days?: number): Promise<ActivityData[]> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    return days ? mockActivityData.slice(-days) : mockActivityData
  },

  getSkills: async (): Promise<Skill[]> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    return mockSkills
  },

  getInsights: async (): Promise<Insight[]> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    return mockInsights
  },

  // Activity endpoints
  logActivity: async (activity: any): Promise<{ success: boolean }> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    return { success: true }
  }
}

export default api
