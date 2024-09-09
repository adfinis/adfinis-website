import React from "react"

type LogoProps = {
  variant: "horizontal" | "icon" | "vertical"
  color: "stone" | "biscay" | "sapphire" | "jumbo"
}

/**
 * TODO: Replace placeholder logo with image src from API.
 */
const Logo: React.FC<LogoProps> = ({ color, variant }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="max-h-full"
    >
      <circle cx="12" cy="12" r="10" fill="#f5f6f5" />
      <path
        d="M12 2 L22 8 L22 16 L12 22 L2 16 L2 8 Z"
        fill="#2e4b98"
        stroke="#f5f6f5"
        strokeWidth={1}
      />
    </svg>
  )
}

export default Logo
