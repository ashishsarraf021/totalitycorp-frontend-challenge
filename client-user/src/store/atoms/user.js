import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: {
    email: localStorage.getItem('email'),
    username: localStorage.getItem('email')?.split('@')[0].toUpperCase(),
    isLoggedIn: localStorage.getItem('isLoggedIn') !== null,
  },
});

export const cartState = atom({
  key: "cartState", // Unique ID (with respect to other atoms/selectors)
  default: [], // Initial value (an empty array in this case)
});
