import { create } from "zustand";

const useUIStore = create((set) => ({
  wishlistOpen: false,
  cartOpen: false,

  openWishlist: () =>
    set({
      wishlistOpen: true,
      cartOpen: false,
    }),

  openCart: () =>
    set({
      cartOpen: true,
      wishlistOpen: false,
    }),

  closeAll: () =>
    set({
      wishlistOpen: false,
      cartOpen: false,
    }),
}));

export default useUIStore;