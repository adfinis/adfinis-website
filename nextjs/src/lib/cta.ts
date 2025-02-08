export interface CTA {
  /**
   * @deprecated use `label` instead
   */
  text?: string
  label?: string
  href: string
  variant: "cta" | "primary" | "secondary" | "text"
  size?: "small" | "large"
}
