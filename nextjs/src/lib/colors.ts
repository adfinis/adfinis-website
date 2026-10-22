/**
 * @info please keep in sync with globals.css -> :root
 * @info If you need to use reference the colors using css var(), use the :root variables instead of accessing this object directly
 * @see globals.css
 * 
 * white: "rgb(var(--rgb-white))", // "#FFFFFF",
  stone: "rgb(var(--rgb-stone))", // "#0F0F0F",
  biscay: "rgb(var(--rgb-biscay))", // "#1C2E5D",
  sapphire: "rgb(var(--rgb-sapphire))", // "#2E4B98",
  jumbo: "rgb(var(--rgb-jumbo))", // "#8B8B8C",
  neutral: "rgb(var(--rgb-neutral))", // "#F5F6F5",
  sunglow: "rgb(var(--rgb-sunglow))", // "#FFCA31",
  sky: "rgb(var(--rgb-sky))", // "#55C0EE",
  cinnamon: "rgb(var(--rgb-cinnamon))", // "#E56820",
  green: "rgb(var(--rgb-green))", // "#34AE6B",
  razzmatazz: "rgb(var(--rgb-razzmatazz))", // "#E30D74",
  fuchsia: "rgb(var(--rgb-fuchsia))", // "#7E57C2",
  manhattan: "rgb(var(--rgb-manhattan))", // "#F7C6A5",
  error: "rgb(var(--rgb-error))", // "#FF0E00",
  grass: "rgb(var(--rgb-grass))", // "#7E9600",
  salmon: "rgb(var(--rgb-salmon))", // "#F7C6A5",
  pink: "rgb(var(--rgb-pink))", // "#E30D74",
  purple: "rgb(var(--rgb-purple))", // "#6E0069",
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
