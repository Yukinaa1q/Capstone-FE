/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        logo: ["Bodoni Moda"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",

        // team defined colors pallete
        t_primary: {
          700: "#001742",
          600: "#00337f",
          500: "#0051c2",
          400: "#2973FF",
          300: "#7f9cff",
          200: "#b8c5ff",
          100: "#ecefff",
        },
        t_secondary: {
          700: "#130066",
          600: "#2a00bb",
          500: "#4A29FF",
          400: "#7567ff",
          300: "#9e97ff",
          200: "#c7c4ff",
          100: "#f0efff",
        },
        t_tertiary: {
          700: "#19191b",
          600: "#36373b",
          500: "#57585e",
          400: "#7a7b82",
          300: "#9fa0a5",
          200: "#c7c7ca",
          100: "#efeff0",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
