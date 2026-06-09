import { create } from "zustand";

const useWishlistStore = create((set) => ({
  wishlist: [],

  toggleWishlist: (course) =>
    set((state) => {
      const exists = state.wishlist.find(
        (item) => item._id === course._id
      );

      if (exists) {
        return {
          wishlist: state.wishlist.filter(
            (item) => item._id !== course._id
          ),
        };
      }

      return {
        wishlist: [...state.wishlist, course],
      };
    }),
}));

export default useWishlistStore;