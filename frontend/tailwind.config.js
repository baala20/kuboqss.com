/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        plum: {
          DEFAULT: "#4B173D",
          dark: "#3a1130",
          light: "#6b2558",
        },
        gold: {
          DEFAULT: "#C99A6B",
          light: "#dbb98f",
          dark: "#a87d50",
        },
        rosegold: {
          DEFAULT: "#C99A6B",
          light: "#dbb98f",
          dark: "#a87d50",
        },
        ivory: {
          DEFAULT: "#FFF8F1",
          dark: "#f5eddf",
        },
        blush: {
          DEFAULT: "#F4DDE7",
          dark: "#e5c8d5",
        },
        ink: {
          DEFAULT: "#211A1F",
          soft: "#3d3238",
        },
        taupe: {
          DEFAULT: "#8A747D",
          light: "#a8949c",
        },
        charcoal: {
          DEFAULT: "#211A1F",
          muted: "#8A747D",
        },
      },
      fontFamily: {
        arabic: ["var(--font-arabic)", "IBM Plex Sans Arabic", "Tajawal", "Cairo", "sans-serif"],
        heading: ["var(--font-arabic)", "Cairo", "IBM Plex Sans Arabic", "sans-serif"],
      },
      boxShadow: {
        premium: "0 24px 80px rgba(75, 23, 61, 0.12)",
        card: "0 8px 32px rgba(75, 23, 61, 0.08)",
        lift: "0 16px 48px rgba(75, 23, 61, 0.14)",
        glow: "0 0 0 1px rgba(201, 154, 107, 0.25), 0 8px 24px rgba(75, 23, 61, 0.1)",
      },
      animation: {
        "slide-in-right": "slideInRight 0.3s ease-out",
        "fade-in": "fadeIn 0.2s ease-out",
        "slide-up": "slideUp 0.35s ease-out",
      },
      keyframes: {
        slideInRight: {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
