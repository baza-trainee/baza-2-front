import { create } from 'zustand'
//ua | en | pl
const switchLocaleAdmin = create((set) => ({
  localeAdmin: 'ua',
  switchLocale: (locale) => set({ localeAdmin: locale }),
}))

export default switchLocaleAdmin