import { create } from 'zustand'
//uk | en | pl
const switchLocaleAdmin = create((set) => ({
  localeAdmin: 'uk',
  switchLocale: (locale) => set({ localeAdmin: locale }),
}))

export default switchLocaleAdmin