import { type Config } from "tailwindcss"
import { colors } from "./src/lib/colors"
import tailwindCssFormsPlugin from "@tailwindcss/forms"

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
      16: "1rem", // 16px
      18: "1.125rem", // 18px
      20: "1.25rem", // 20px
      22: "1.375rem", // 22px
      25: "1.5625rem", // 25px
      30: "1.875rem", // 30px
      35: "2.1875rem", // 35px
      40: "2.5rem", // 40px
      50: "3.125rem", // 50px
    },
    /**
     * @info colors here are using hex values directly, so we can use tailwind css intellisense color swatches.
     */
    colors,
    boxShadow: {
      "1": "0px 2px 6px 0px rgba(0, 0, 0, 0.20)",
      "2": "2px 4px 12px 0px rgba(0, 0, 0, 0.10)",
    },
    container: {
      center: true,
    },
    extend: {
      lineHeight: {
        "6.5": "1.625rem", // 26px
        "7.5": "1.875rem", // 30px
        11: "2.75rem", // 44px
        12: "3rem", // 48px
        13: "3.25rem", // 52px
      },
      screens: {
        "3xl": "2160px",
      },
      spacing: {
        15: "3.75rem",
        18: "4.5rem",
        30: "7.5rem",
      },
      height: {
        "12.5": "3.125rem", // 50px
        100: "25rem",
      },
      width: {
        112: "28rem",
        128: "32rem",
      },

      /**
       * @description set of classes with different data-scheme="light" and data-scheme="dark" values
       * @info references to css variables need to be wrapped in rgb() to work with tailwindcss jit opacity
       * @example bg-input-primary/5
       */
      backgroundColor: {
        "button-primary": "rgb(var(--button-bg-primary))",
        "button-secondary": "rgb(var(--button-bg-secondary))",
        "input-primary": "rgb(var(--input-bg-primary))",
      },
      textColor: {
        "title-primary": "rgb(var(--title-text-primary))",
        "button-primary": "rgb(var(--button-text-primary))",
        "button-secondary": "rgb(var(--button-text-secondary))",
        "paragraph-primary": "rgb(var(--paragraph-text-primary))",
        "input-primary": "rgb(var(--input-text-primary))",
        "checkbox-primary": "rgb(var(--checkbox-text-primary))",
      },
      borderColor: {
        "button-primary": "rgb(var(--button-text-primary))",
        "button-secondary": "rgb(var(--button-text-secondary))",
        "quote-primary": "rgb(var(--quote-border-primary))",
        "input-primary": "rgb(var(--input-border-primary))",
        "checkbox-primary": "rgb(var(--checkbox-border-primary))",
      },
      ringColor: {
        "input-primary": "rgb(var(--input-ring-primary))",
        "checkbox-primary": "rgb(var(--checkbox-ring-primary))",
      },
      ringOffsetColor: {
        "checkbox-primary": "rgb(var(--checkbox-ring-offset-primary))",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      aspectRatio: {
        /**
         * @info aspect ratio 2/3 is portrait mode.
         */
        "2/3": "2/3",
      },
    },
  },
  plugins: [tailwindCssFormsPlugin()],
}
export default config
