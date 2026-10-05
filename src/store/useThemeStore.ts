import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ThemeState {
  isDark: boolean;
  toggleTheme: () => void;
  setDark: (isDark: boolean) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDark: typeof window !== "undefined" ? matchMedia("(prefers-color-scheme: dark)").matches : false,

      toggleTheme: () =>
        set((state) => {
          const nextDark = !state.isDark;
          if (typeof document !== "undefined") {
            document.documentElement.classList.toggle("dark", nextDark);
          }
          return { isDark: nextDark };
        }),

      setDark: (isDark: boolean) => {
        if (typeof document !== "undefined") {
          document.documentElement.classList.toggle("dark", isDark);
        }
        set({ isDark });
      },
    }),
    {
      name: "morrow-theme-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state && typeof document !== "undefined") {
          document.documentElement.classList.toggle("dark", state.isDark);
        }
      },
    }
  )
);
