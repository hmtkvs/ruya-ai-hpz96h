import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SubscriptionState {
  freeInterpretationsLeft: number
  isPremium: boolean
  setFreeInterpretationsLeft: (count: number) => void
  decrementFreeInterpretations: () => void
  setPremium: (isPremium: boolean) => void
}

export const useSubscriptionStore = create<SubscriptionState>()(
  persist(
    (set) => ({
      freeInterpretationsLeft: 1,
      isPremium: false,
      setFreeInterpretationsLeft: (count) => set({ freeInterpretationsLeft: count }),
      decrementFreeInterpretations: () => 
        set((state) => ({ freeInterpretationsLeft: Math.max(0, state.freeInterpretationsLeft - 1) })),
      setPremium: (isPremium) => set({ isPremium })
    }),
    {
      name: 'subscription-storage'
    }
  )
)