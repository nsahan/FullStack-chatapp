import { create } from "zustand";

export const useTheme = create((set) => ({
  theme: localStorage.getItem("c-theme") || "dark",
  setTheme: (theme) => {
    localStorage.setItem("c-theme", theme);
    set({ theme });
  },
}));
