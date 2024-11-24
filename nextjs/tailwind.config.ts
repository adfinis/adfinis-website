import { type Config } from "tailwindcss"
import { spacing, maxWidth } from "tailwindcss/defaultTheme"
import { colors } from "./src/lib/colors"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["var(--font-source-sans-3)", "sans-serif"],
    },
    fontSize: {
      12: "0.75rem", // 12px
      14: "0.875rem", // 14px
      18: "1.125rem", // 18px
      20: "1.25rem", // 20px
      22: "1.375rem", // 22px
      25: "1.5625rem", // 25px
      30: "1.875rem", // 30px
      35: "2.1875rem", // 35px
      40: "2.5rem", // 40px
      50: "3.125rem", // 50px
    },
    colors,
    boxShadow: {
      "1": "0px 2px 6px 0px rgba(0, 0, 0, 0.20)",
      "2": "2px 4px 12px 0px rgba(0, 0, 0, 0.10)",
    },
    container: {
      center: true,
    },
    extend: {
      spacing: {
        15: "3.75rem",
        18: "4.5rem",
      },
      height: {
        100: "25rem",
      },
      width: {
        112: "28rem",
        128: "32rem",
      },
      backgroundColor: {
        "button-primary": "var(--button-bg-primary)",
        "button-secondary": "var(--button-bg-secondary)",
      },
      textColor: {
        "title-primary": "var(--title-text-primary)",
        "button-primary": "var(--button-text-primary)",
        "button-secondary": "var(--button-text-secondary)",
        "paragraph-primary": "var(--paragraph-text-primary)",
      },
      borderColor: {
        "button-primary": "var(--button-text-primary)",
        "button-secondary": "var(--button-text-secondary)",
        "quote-primary": "var(--quote-border-primary)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
}
export default config
