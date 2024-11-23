import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SubscriptionState {
  freeInterpretationsLeft: number
  isPremium: boolean
  setFreeInterpretationsLeft: (count: number) => void
  decrementFreeInterpretations: () => void
  setPremium: (isPremium: boolean) => void
  resetState: () => void
}

const INITIAL_STATE = {
  freeInterpretationsLeft: 3,
  isPremium: false
}

export const useSubscriptionStore = create<SubscriptionState>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,
      setFreeInterpretationsLeft: (count) => set({ freeInterpretationsLeft: count }),
      decrementFreeInterpretations: () => 
        set((state) => ({ freeInterpretationsLeft: Math.max(0, state.freeInterpretationsLeft - 1) })),
      setPremium: (isPremium) => set({ isPremium }),
      resetState: () => set(INITIAL_STATE)
    }),
    {
      name: 'subscription-storage'
    }
  )
)