import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// const stateModalPayment = create((set) => ({
//   isOpen: false,
//   open: () => set({ isOpen: true }),
//   close: () => set({ isOpen: false }),
// }))

const stateModalPayment = create(
  persist(
    (set) => ({
      isOpen: false,

      //isLoader: false,
      //isError: false,
      isThanks: false,
      //fishes: 0,
      //addAFish: () => set({ fishes: get().fishes + 1 }),

      open: () => set({ isOpen: true }),
      //startLoader: () => set({ isLoader: true }),
      //stoptLoader: () => set({ isLoader: false }),

      // addError: () => set({ 
      //   isError: true,
      //   isThanks: false
      // }),

      // removeError: () => set({ 
      //   isThanks: true,
      //   isError: false,
      // }),


      addThanks: () => set({ 
        isThanks: true,
        //isError: false,
      }),


      close: () => set({ 
        isOpen: false,
        //isLoader: false,
        //isError: false,
        isThanks: false 
      }),
    }),
    {
      name: 'payment-modal-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)

export default stateModalPayment