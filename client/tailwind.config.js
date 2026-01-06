/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                plant: {
                    50: "#f0fdf4",
                    100: "#dcfce7",
                    200: "#bbf7d0",
                    300: "#86efac",
                    400: "#4ade80",
                    500: "#22c55e",
                    600: "#16a34a",
                    700: "#15803d",
                    800: "#166534",
                    900: "#14532d",
                    950: "#052e16",
                },
                leaf: {
                    light: "#84cc16",
                    DEFAULT: "#65a30d",
                    dark: "#4d7c0f",
                },
                earth: {
                    light: "#a8a29e",
                    DEFAULT: "#78716c",
                    dark: "#57534e",
                },
            },
            animation: {
                "fade-in": "fadeIn 0.3s ease-out",
                "slide-down": "slideDown 0.3s ease-out",
                "slide-up": "slideUp 0.3s ease-out",
                float: "float 3s ease-in-out infinite",
                "pulse-slow": "pulse 3s ease-in-out infinite",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideDown: {
                    "0%": { opacity: "0", transform: "translateY(-10px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                slideUp: {
                    "0%": { opacity: "0", transform: "translateY(10px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-5px)" },
                },
            },
            backdropBlur: {
                xs: "2px",
            },
            boxShadow: {
                glow: "0 0 20px rgba(34, 197, 94, 0.3)",
                "glow-lg": "0 0 40px rgba(34, 197, 94, 0.4)",
            },
        },
    },
    plugins: [daisyui],
    daisyui: {
        themes: [
            {
                plantnet: {
                    primary: "#22c55e",
                    secondary: "#84cc16",
                    accent: "#16a34a",
                    neutral: "#1f2937",
                    "base-100": "#ffffff",
                    info: "#0ea5e9",
                    success: "#22c55e",
                    warning: "#f59e0b",
                    error: "#ef4444",
                },
            },
        ],
    },
};
