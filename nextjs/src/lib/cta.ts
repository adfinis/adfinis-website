export interface CTA {
  text: string
  href: string
  variant: "cta" | "primary" | "secondary" | "text"
  size?: "small" | "large"
}
