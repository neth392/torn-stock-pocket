import { create } from 'zustand'

type UserMoneyState = {
  userMoney: number
  setUserMoney: (userMoney: number) => void
}

export const useUserMoneyStore = create<UserMoneyState>((set) => ({
  userMoney: 0,
  setUserMoney: (userMoney: number) => set({ userMoney }),
}))
