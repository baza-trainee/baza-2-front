import { create } from 'zustand'
//team
const switchTabProject = create((set) => ({
  tabName: 'description',
  switch: (name) => set({ tabName: name }),
}))

export default switchTabProject