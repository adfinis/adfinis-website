import { twMerge } from "tailwind-merge"
import { colors } from "@/lib/colors"

type SlantProps = {
  color: keyof typeof colors
  className?: string
}

const Slant: React.FC<SlantProps> = ({ color, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1000"
    height="105"
    viewBox="0 0 1000 105"
    aria-hidden="true"
    className={twMerge("block w-full h-auto", className)}
  >
    <path d="M0 0V105H1000Z" fill={colors[color]} />
  </svg>
)

export default Slant
