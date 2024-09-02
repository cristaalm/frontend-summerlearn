import { defineStore } from "pinia";

interface DarkModeState {
  value: boolean;
}

export const useDarkModeStore = defineStore("darkMode", {
  state: (): DarkModeState => ({
    value: localStorage.getItem("darkMode") === "true",
  }),
  getters: {
    darkMode(state) {
      if (localStorage.getItem("darkMode") === null) {
        localStorage.setItem("darkMode", "false");
      }

      return state.value;
    },
  },
  actions: {
    setDarkMode(darkMode: boolean) {
      localStorage.setItem("darkMode", darkMode.toString());
      this.value = darkMode;
    },
  },
});
