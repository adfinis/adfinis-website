/**
 * @info please keep in sync with globals.css -> :root
 * @info If you need to use reference the colors using css var(), use the :root variables instead of accessing this object directly
 * @see globals.css
 * 
 * white: "rgb(var(--color-white))", // "#FFFFFF",
  stone: "rgb(var(--color-stone))", // "#0F0F0F",
  biscay: "rgb(var(--color-biscay))", // "#1C2E5D",
  sapphire: "rgb(var(--color-sapphire))", // "#2E4B98",
  jumbo: "rgb(var(--color-jumbo))", // "#8B8B8C",
  neutral: "rgb(var(--color-neutral))", // "#F5F6F5",
  sunglow: "rgb(var(--color-sunglow))", // "#FFCA31",
  sky: "rgb(var(--color-sky))", // "#55C0EE",
  cinnamon: "rgb(var(--color-cinnamon))", // "#E56820",
  green: "rgb(var(--color-green))", // "#34AE6B",
  razzmatazz: "rgb(var(--color-razzmatazz))", // "#E30D74",
  fuchsia: "rgb(var(--color-fuchsia))", // "#7E57C2",
  manhattan: "rgb(var(--color-manhattan))", // "#F7C6A5",
  error: "rgb(var(--color-error))", // "#FF0E00",
  grass: "rgb(var(--color-grass))", // "#7E9600",
  salmon: "rgb(var(--color-salmon))", // "#F7C6A5",
  pink: "rgb(var(--color-pink))", // "#E30D74",
  purple: "rgb(var(--color-purple))", // "#6E0069",
 */
export const colors = {
  white: "#FFFFFF",
  stone: "#0F0F0F",
  biscay: "#1C2E5D",
  sapphire: "#2E4B98",
  jumbo: "#8B8B8C",
  neutral: "#F5F6F5",
  sunglow: "#FFCA31",
  sky: "#55C0EE",
  cinnamon: "#E56820",
  /**
   * @deprecated use 'grass' instead
   */
  green: "#34AE6B",
  /**
   * @deprecated use 'pink' instead
   */
  razzmatazz: "#E30D74",
  /**
   * @deprecated use 'purple' instead
   */
  fuchsia: "#7E57C2",
  /**
   * @deprecated use 'salmon' instead
   */
  manhattan: "#F7C6A5",
  error: "#FF0E00",
  grass: "#7E9600",
  salmon: "#F7C6A5",
  pink: "#E30D74",
  purple: "#6E0069",
} as const
