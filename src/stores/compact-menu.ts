import { defineStore } from "pinia";

interface CompactMenuState {
  value: boolean;
}

const getCompactMenu = () => {
  return localStorage.getItem("compactMenu") === "true";
};

export const useCompactMenuStore = defineStore("compactMenu", {
  state: (): CompactMenuState => ({
    value:
      localStorage.getItem("compactMenu") === null ? true : getCompactMenu(),
  }),
  getters: {
    compactMenu(state) {
      if (localStorage.getItem("compactMenu") === null) {
        localStorage.setItem("compactMenu", "default");
      }

      return state.value;
    },
  },
  actions: {
    setCompactMenu(compactMenu: boolean) {
      localStorage.setItem("compactMenu", compactMenu.toString());
      this.value = compactMenu;
    },
  },
});
