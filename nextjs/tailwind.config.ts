import { type Config } from "tailwindcss"
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
      14: "0.875rem", // 14px
      18: "1.125rem", // 18px
      29: "1.25rem", // 20px
      22: "1.375rem", // 22px
      30: "1.875rem", // 30px
      35: "2.1875rem", // 35px
      40: "2.5rem", // 40px
      50: "3.125rem", // 50px
    },
    colors: {
      stone: "#0F0F0F",
      biscay: "#1C2E5D",
      sapphire: "#2E4B98",
      jumbo: "#8B8B8C",
      neutral: "#F5F6F5",
      sunglow: "#FFCA31",
      sky: "#55C0EE",
      cinnamon: "#E56820",
      green: "#34AE6B",
      razzmatazz: "#E30D74",
      fuchsia: "#7E57C2",
      manhattan: "#F7C6A5",
    },
    boxShadow: {
      "1": "0px 2px 6px 0px rgba(0, 0, 0, 0.20)",
      "2": "2px 4px 12px 0px rgba(0, 0, 0, 0.10)",
    },
    container: {
      center: true,
    },
    extend: {
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
