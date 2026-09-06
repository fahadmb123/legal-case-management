import {useEffect,useState,type ReactNode,} from "react";
import type { Theme } from "../types/theme.types";
import { ThemeContext } from "./theme";


interface ThemeProviderProps {
    children: ReactNode
}


export function ThemeProvider({ children }: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "light" || savedTheme === "dark") {
            return savedTheme;
        }

        return "light"
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);

        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((currentTheme) =>
            currentTheme === "light" ? "dark" : "light"
        );
    };

    return (
        <ThemeContext.Provider
            value={{
                theme,
                toggleTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    )
}