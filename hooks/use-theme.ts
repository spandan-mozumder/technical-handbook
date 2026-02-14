"use client"

import { useState, useEffect, useCallback } from "react"

export function useTheme() {
    const [theme, setThemeState] = useState<"light" | "dark">("light")

    useEffect(() => {
        const stored = localStorage.getItem("handbook-theme") as "light" | "dark" | null
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
        const initial = stored || (prefersDark ? "dark" : "light")
        setThemeState(initial)
        document.documentElement.classList.toggle("dark", initial === "dark")
    }, [])

    const setTheme = useCallback((newTheme: "light" | "dark") => {
        setThemeState(newTheme)
        localStorage.setItem("handbook-theme", newTheme)
        document.documentElement.classList.toggle("dark", newTheme === "dark")
    }, [])

    const toggleTheme = useCallback(() => {
        setTheme(theme === "light" ? "dark" : "light")
    }, [theme, setTheme])

    return { theme, setTheme, toggleTheme }
}
