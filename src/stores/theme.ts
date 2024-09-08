import { defineStore } from "pinia";
import Echo from "@/components/sidebar/";

export const themes = [
  {
    name: "echo",
    component: Echo,
  },
] as const;

export type Themes = (typeof themes)[number];

interface ThemeState {
  value: Themes["name"];
}

export const getTheme = (search?: Themes["name"]) => {
  const theme = search === undefined ? localStorage.getItem("theme") : search;
  return (
    themes.filter((item, key) => {
      return item.name === theme;
    })[0] || themes[0]
  );
};

export const useThemeStore = defineStore("theme", {
  state: (): ThemeState => ({
    value:
      localStorage.getItem("theme") === null ? themes[0].name : getTheme().name,
  }),
  getters: {
    theme(state) {
      if (localStorage.getItem("theme") === null) {
        localStorage.setItem("theme", "echo");
      }

      return state.value;
    },
  },
  actions: {
    setTheme(theme: Themes["name"]) {
      this.value = theme;

      localStorage.setItem("theme", theme);
    },
  },
});
