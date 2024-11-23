import type { Dream } from '../types'

// Mock storage using localStorage
class MockStorage {
  private readonly STORAGE_KEY = 'dreamscape_dreams'

  private getDreams(): Dream[] {
    const stored = localStorage.getItem(this.STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  }

  private saveDreams(dreams: Dream[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(dreams))
  }

  async saveDream(dream: Omit<Dream, 'id' | 'createdAt'>): Promise<Dream> {
    const dreams = this.getDreams()
    const newDream: Dream = {
      ...dream,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    }
    
    dreams.push(newDream)
    this.saveDreams(dreams)
    return newDream
  }

  async getDreamsByUser(userId: string): Promise<Dream[]> {
    return this.getDreams().filter(dream => dream.userId === userId)
  }

  async deleteDream(dreamId: string, userId: string): Promise<void> {
    const dreams = this.getDreams()
    const filtered = dreams.filter(
      dream => !(dream.id === dreamId && dream.userId === userId)
    )
    this.saveDreams(filtered)
  }

  async updateDreamPrivacy(dreamId: string, userId: string, isPublic: boolean): Promise<void> {
    const dreams = this.getDreams()
    const updated = dreams.map(dream => 
      dream.id === dreamId && dream.userId === userId
        ? { ...dream, isPublic }
        : dream
    )
    this.saveDreams(updated)
  }
}

export const mockStorage = new MockStorage()