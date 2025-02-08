import React from "react"

interface IconFlagCHProps {
  className?: string
}

const IconFlagCH: React.FC<IconFlagCHProps> = ({ className }) => (
  <svg
    className={className}
    enableBackground="new 0 0 512 512"
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="256" cy="256" fill="#d80027" r="256" />
    <path
      d="m389.565 211.479h-89.043v-89.044h-89.044v89.044h-89.043v89.043h89.043v89.043h89.044v-89.043h89.043z"
      fill="#f0f0f0"
    />
  </svg>
)

export default IconFlagCH
