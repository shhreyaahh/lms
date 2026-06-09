import { create } from "zustand";

const useCartStore = create((set) => ({
  cart: [],

  toggleCart: (course) =>
    set((state) => {
      const exists = state.cart.find(
        (item) => item._id === course._id
      );

      if (exists) {
        return {
          cart: state.cart.filter(
            (item) => item._id !== course._id
          ),
        };
      }

      return {
        cart: [...state.cart, course],
      };
    }),
}));

export default useCartStore;