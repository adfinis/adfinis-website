import { twMerge } from "tailwind-merge"
import { colors } from "../../tailwind.config"

type TriangleProps = {
  color: keyof typeof colors
  className?: string
}

const Triangle: React.FC<TriangleProps> = ({ color, className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="696"
      height="150"
      viewBox="0 0 696 150"
      fill="none"
      className={twMerge(className)}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M696 150.067V0.0665283L0 150.067H696Z"
        fill="url(#triangle-gradient)"
      />
      <defs>
        <linearGradient
          id="triangle-gradient"
          x1="226.492"
          y1="75.0665"
          x2="696"
          y2="75.0665"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            stopColor={colors[color || "neutral"]}
            stopOpacity={color === "neutral" ? 1 : 0}
          />
          <stop offset="1" stopColor={colors[color || "neutral"]} />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default Triangle
