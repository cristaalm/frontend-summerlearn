
import { useColorSchemeStore, colorSchemes, getColorScheme } from "@/stores/color-scheme";  

const setColorSchemeClass = () => {
    const el = document.querySelectorAll("html")[0];
    el.setAttribute("class", useColorSchemeStore().colorScheme);
};

const getColorSchemeUser = () => {
    return localStorage.getItem("userTheme") || colorSchemes[5];
}

const switchColorScheme = (colorScheme) => {
    useColorSchemeStore().setColorScheme(colorScheme);
    setColorSchemeClass();
};

const setLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
};

export const loginColorSheme = () => {
    switchColorScheme(getColorSchemeUser())
}

export const logoutColorScheme = (theme = '') => {
    if (theme) {
        setLocalStorage('userTheme', theme)
        switchColorScheme(theme)
        return
    }
    setLocalStorage('userTheme', getColorScheme())
    switchColorScheme('theme-19');
}