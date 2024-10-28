import { colors } from "@/lib/colors"

export interface Card {
  title: string
  description: string
  color?: keyof typeof colors
  imageUrl?: string
}
